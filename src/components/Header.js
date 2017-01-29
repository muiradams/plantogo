import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import { signoutUser } from '../actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';
import EditTripDialog from './EditTripDialog';

class Header extends Component {
  handleLogOut() {
    this.props.signoutUser();
    browserHistory.push('/');
  }

  handleLeftButton() {
    const { username, tripId } = this.props.params;
    const pathname = this.props.location.pathname;
    const containsActivity = new RegExp("activity");

    if (containsActivity.test(pathname)) {
      browserHistory.push(`/user/${username}/trip/${tripId}`);
    } else {
      browserHistory.push(`/user/${username}/`);
    }
  }

  showLeftButton() {
    const { tripId, activityId } = this.props.params;
    if ( tripId || activityId ) {
      return (
        <IconButton onClick={this.handleLeftButton.bind(this)}><NavigationBack /></IconButton>
      );
    }

    // Can add code here for a drawer on the left
    return <div></div>;
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  formatActivityType(activityType) {
    switch(activityType) {
      case 'car':
        return 'Car Rental';
      case 'other':
        return 'Activity';
      default:
        return this.toTitleCase(activityType);
    }
  }

  showTitle() {
    const { tripId: pathContainsTripId, activityId: pathContainsActivityId } = this.props.params;
    const { trip, activity } = this.props;
    const pathname = this.props.location.pathname;
    const containsActivity = new RegExp("activity");
    const containsTrip = new RegExp("trip");

    // Creating an activity
    if (!pathContainsActivityId && containsActivity.test(pathname)) {
      return 'Create A New Activity';
    }

    // Updating an activity
    if (pathContainsActivityId && activity) {
      return `Edit ${this.formatActivityType(activity.activityType)}`;
    }

    // Viewing a trip
    if (pathContainsTripId && trip) {
      return (
        <EditTripDialog />
      );
    }

    // Showing all trips
    if (!pathContainsTripId && !pathContainsActivityId) {
      return 'PlanToGo';
    }
  }

  render() {
    const styles = {
      title: {
        position: 'relative',
        left: '0px',
        fontFamily: '"Jaldi", sans-serif',
        fontWeight: 400,
        fontSize: '20px',
      },
      bar: {
        background: '#303F9F',
        position: 'fixed',
      }
    };

    return(
      <AppBar
        title={<span style={styles.title}>{this.showTitle()}</span>}
        iconElementLeft={this.showLeftButton()}
        iconElementRight={
          <FlatButton onClick={this.handleLogOut.bind(this)} label="Logout" />
        }
        style={styles.bar}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    trip: state.trips.trip,
    activity: state.trips.activity,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Header));
