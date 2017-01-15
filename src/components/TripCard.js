import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import moment from 'moment';
import { deleteTrip } from "../actions";
import { Card, CardTitle } from 'material-ui/Card';

class TripCard extends Component {
  constructor(props) {
    super(props);
    this.trip = props.trip;
  }

  handleTouchTap() {
    const username = this.props.params.username;
    browserHistory.push(`/user/${username}/trip/${this.trip._id}`);
  }

  render() {
    const activities = this.trip.activities;
    let startDate = '';
    let endDate = '';
    if (activities.length > 0) {
      startDate = moment(activities[0].start).format("MMMM D, YYYY");
      endDate = moment(activities[activities.length - 1].end).format("MMMM D, YYYY");
    }

    const styles = {
      title: {
        cursor: 'pointer',
        textAlign: 'center',
      },
    };

    return (
      <Card className="trip-card">
        <CardTitle title={this.trip.tripName}
          subtitle={startDate ? `${startDate} - ${endDate}` : '(No activities planned)'}
          style={styles.title}
          titleColor="#3F51B5"
          subtitleColor="#687486"
          onClick={this.handleTouchTap.bind(this)} >

        </CardTitle>
      </Card>
    );
  }
}

export default withRouter(connect(null, { deleteTrip })(TripCard));
