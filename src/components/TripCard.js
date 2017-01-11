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
    // TODO: username in the path below needs to be replaced with the current user's username;
    browserHistory.push(`/user/${this.username}/trip/${this.trip.tripName}`);
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

    const tripDate = new Intl.DateTimeFormat('en-US', dateDisplayOptions).format(this.trip.tripDate);

    return (
      <Card className="trip-card">
        <CardTitle title={this.trip.tripName}
          subtitle={tripDate}
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
