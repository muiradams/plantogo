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

  renderDates() {
    const activities = this.trip.activities;
    let startDate = '';
    let endDate = '';
    if (activities.length > 0) {
      const start = moment(activities[0].start);
      let end = '';
      if (activities[activities.length - 1].end) {
        end = moment(activities[activities.length - 1].end);
      } else {
        end = moment(activities[activities.length - 1].start);
      }
      if (start.get('month') === end.get('month') && start.get('year') === end.get('year')) {
        if (start.get('date') === end.get('date')) {
          startDate = start.format("MMMM D, YYYY");
          endDate = '';
        } else {
          startDate = start.format("MMMM D");
          endDate = end.format("D, YYYY");
        }
      } else {
        if (start.get('month') !== end.get('month') && start.get('year') === end.get('year')) {
          startDate = start.format("MMMM D");
          endDate = end.format("MMMM D, YYYY");
        } else {
          startDate = start.format("MMMM D, YYYY");
          endDate = end.format("MMMM D, YYYY");
        }
      }
    }

    let dateSubtitle = '(No activities planned)';
    if (endDate) {
      dateSubtitle = `${startDate} - ${endDate}`;
    } else if (startDate) {
      dateSubtitle = `${startDate}`;
    }

    return dateSubtitle;
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
        textAlign: 'center',
      },
    };

    return (
      <Card className="trip-card">
        <CardTitle title={this.trip.tripName}
          subtitle={this.renderDates()}
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
