import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import { deleteTrip } from "../actions";
import { Card, CardTitle } from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripCard extends Component {
  constructor(props) {
    super(props);
    this.trip = props.trip;
  }

  handleTouchTap() {
    const username = this.props.params.username;
    browserHistory.push(`/user/${username}/trip/${this.trip._id}`);
  }

  handleDelete() {
    console.log("props.params: ", this.props.params);
    const username = this.props.params.username;
    const tripId = this.trip._id;
    this.props.deleteTrip(username, tripId);
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

    return (
      <Card className="trip-card">
        <CardTitle title={this.trip.tripName}
          subtitle={formattedTripDate}
          style={styles.title}
          titleColor="#3F51B5"
          subtitleColor="#687486"
          onClick={this.handleTouchTap.bind(this)} >
          <div className="delete-trip-icon">
            <AddIcon className="delete-icon" onClick={this.handleDelete.bind(this)} />
          </div>
        </CardTitle>
      </Card>
    );
  }
}

export default withRouter(connect(null, { deleteTrip })(TripCard));
