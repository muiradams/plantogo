import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signoutUser } from '../actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/chevron-left';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
  handleTouchTap() {
    browserHistory.push('/');
  }

  handleLogOut() {
    this.props.signoutUser();
    browserHistory.push('/');
  }

  showLeftButton() {
    if (this.props.isRootRoute) {
      // TODO: Show a drawer on the left with a link to settings like changing password
      return;
    }

    return (
      <IconButton onClick={browserHistory.goBack}><NavigationBack /></IconButton>
    );
  }

  showTitle() {
    if (this.props.isRootRoute) {
      return 'PlanToGo';
    }

    if (this.props.activity) {
      return this.props.activity.activityName;
    }

    if(this.props.trip) {
      return this.props.trip.tripName;
    }

    return 'PlanToGo';
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
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

export default connect(mapStateToProps, { signoutUser })(Header);
