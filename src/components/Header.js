import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import { signoutUser } from '../actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
  handleLogOut() {
    this.props.signoutUser();
    browserHistory.push('/');
  }

  handleLeftButton() {
    const { username, tripId, activityId } = this.props.params;

    if (activityId) {
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

    // TODO: Show a drawer on the left with a link to settings like changing password
    return;
  }

  showTitle() {
    const { tripId, activityId } = this.props.params;

    if (this.props.activity && activityId) {
      return this.props.activity.activityName;
    }

    if (this.props.trip && tripId) {
      return this.props.trip.tripName;
    }

    if (!tripId && !activityId) {
      return 'PlanToGo';
    }
  }

  render() {
    const styles = {
      title: {
        position: 'relative',
        left: '15px',
        fontFamily: '"Jaldi", sans-serif',
        fontWeight: 400,
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
