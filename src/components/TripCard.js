import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

export default class TripCard extends Component {
  constructor(props) {
    super(props);
    this.trip = props.trip;
    this.username = props.username;
  }

  handleTouchTap() {
    browserHistory.push(`/user/${this.username}/trip/${this.trip._id}`);
   }

  render() {
    const dateDisplayOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    const styles = {
      title: {
        cursor: 'pointer',
        textAlign: 'center',
      },
    };

    let formattedTripDate = "May 10, 2017";

    // TODO: Figure out how to deserialize the date, once I have started
    // creating activities that have a date.
    // if (this.trip.activities.length > 0) {
    //   const tripDate = this.trip.activities[0].startTime;
      // Something to deserialize the date string returned from the API
      // formattedTripDate = new Intl.DateTimeFormat('en-US', dateDisplayOptions).format(tripDate);
      // OR?
      //formattedTripDate = tripDate.toLocaleTimeString("en-us", dateDisplayOptions);
    // }

    return (
      <Card className="trip-card">
        <CardTitle title={this.trip.tripName}
          subtitle={formattedTripDate}
          style={styles.title}
          titleColor="#3F51B5"
          subtitleColor="#687486"
          onClick={this.handleTouchTap.bind(this)} >
          <div className="delete-trip-icon">
            <AddIcon className="delete-icon" onClick={this.handleTouchTap.bind(this)} />
          </div>
        </CardTitle>
      </Card>
    );
  }
}

TripCard.contextTypes = {
  router: PropTypes.object,
};
