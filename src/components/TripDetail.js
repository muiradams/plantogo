import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMeasurements, fetchTrip } from '../actions/';
import TripActivity from './TripActivity';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripDetail extends Component {
  componentWillMount() {
    const username = this.props.params.username;
    const tripId = this.props.params.tripId;

    this.props.fetchTrip(username, tripId);
  }

  renderActivities(trip) {
    const username = this.props.params.username;
    const tripId = this.props.params.tripId;

    if (trip.activities.length > 0) {
      const activities = trip.activities.map((activity, index, activities) => {
        return <TripActivity key={index}
                             activity={activity}
                             index={index}
                             username={username}
               />;
      });

      return activities;
    }
  }

  renderAddActivityIcons(trip) {
    if (trip.activities.length > 1) {
      const AddActivityIcons = trip.activities.map((activity, index, activities) => {
        const measurements = this.props.measurements || [];
        if (measurements[0]) {
          //Don't include an "add activity icon" if it's the last activity
          if (index !== activities.length - 1) {
            const timelinePost1 = measurements[index];
            const timelinePost2 = measurements[index + 1];
            const locationToAddActivityIcon = (timelinePost1 + ((timelinePost2 - timelinePost1) / 2)) - 63;
            const style = {
              top: locationToAddActivityIcon,
              position: 'absolute',
            };

            return (
              <div className="add-activity-icon" style={style} key={index}>
                <AddIcon className="activity-icon" />
              </div>
            );
          }
        }
      });

      return AddActivityIcons;
    }
  }

  render() {
    const trip = this.props.trip;

    if (trip) {
      // If no activities have been created for this trip
      if (trip.activities.length === 0) {
        return (
          <div className="jazz-timeline-wrapper">
            <div className="jazz-timeline solid-shadow">
              <div className="add-activity-icon">
                <AddIcon className="activity-icon" />
              </div>
            </div>
            <div className="add-first-activity">Add an Activity</div>
          </div>
        );
      }

      return (
        <div className="jazz-timeline-wrapper">
          <div className="jazz-timeline solid-shadow">
            <div className="add-activity-icon">
              <AddIcon className="activity-icon" />
            </div>
            {this.renderActivities(trip)}
            <div className="add-activity-icon">
              <AddIcon className="activity-icon" />
            </div>
              {this.renderAddActivityIcons(trip)}
          </div>
        </div>
      );
    }

    // No trip exists to render
    return null;
  }
}

function mapStateToProps(state) {
  return {
    trip: state.trips.trip,
    measurements: state.measurements,
  };
  // For testing: view layout without any activities created
  // return { trip: [] };
}

export default connect(mapStateToProps, { clearMeasurements, fetchTrip })(TripDetail);
