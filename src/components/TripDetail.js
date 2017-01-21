import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import * as actions from '../actions/';
import TripActivity from './TripActivity';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripDetail extends Component {
  componentDidMount() {
    const { username, tripId } = this.props.params;
    this.props.fetchTrip(username, tripId);
  }

  handleCreateNewActivity(start) {
    const { username, tripId } = this.props.params;
    if (start) {
      this.props.startBlankActivity({ username, tripId, start });
    }

    browserHistory.push(`/user/${username}/trip/${tripId}/activity/`);
  }

  renderActivities(trip) {
    const { username, tripId } = this.props.params;

    if (trip.activities.length > 0) {
      const activities = trip.activities.map((activity, index, activities) => {
        let prevActivityDate = null;
        if (index > 0) {
          prevActivityDate = activities[index - 1].start;
        }

        return <TripActivity key={`${activity._id}${index}`}
                             activity={activity}
                             prevActivityDate={prevActivityDate}
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
        const measurements = this.props.measurements;
        if (!_.isEmpty(measurements)) {
          //Don't include an "add activity icon" if it's the last activity
          if (index !== activities.length - 1) {
            // Calculate the location in the window to add the newActivityIcon
            const timelinePost1 = measurements[index];
            const timelinePost2 = measurements[index + 1];
            const locationToAddActivityIcon = (timelinePost1 + ((timelinePost2 - timelinePost1) / 2)) - 63;
            const style = {
              top: locationToAddActivityIcon,
              position: 'absolute',
            };

            // Calculate the start time of a new activity between two activites
            let thisActivityEnd;
            if(activity.end) {
              thisActivityEnd = moment(activity.end);
            } else {
              thisActivityEnd = moment(activity.start);
            }

            const nextActivityStart = moment(activities[index + 1].start);
            let difference = nextActivityStart.diff(thisActivityEnd, 'minutes');
            if (difference <= 0) {
              thisActivityEnd = moment(activity.start);
              difference = nextActivityStart.diff(thisActivityEnd, 'minutes');
            }

            const newActivityStart = thisActivityEnd.add(difference / 2, 'minutes');

            return (
              <div className="add-activity-icon" style={style} key={index}>
                <AddIcon className="activity-icon"
                  onClick={() => this.handleCreateNewActivity(newActivityStart)} />
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
      const activities = trip.activities;
      let start;
      let end;
      if (activities.length > 0) {
        // An hour before the first activity's start time
        start = moment(activities[0].start).subtract(1, 'hours');
        // An hour after the last activities end time
        end = moment(activities[activities.length - 1].end).add(1, 'hours');
      }

      // If no activities have been created for this trip
      if (trip.activities.length === 0) {
        return (
          <div>
            <div className="background-dark-cover"></div>
            <div className="jazz-timeline-wrapper gradient-background">
              <div className="jazz-timeline solid-shadow">
                <div className="add-activity-icon">
                  <AddIcon className="activity-icon"
                    onClick={() => this.handleCreateNewActivity()} />
                </div>
              </div>
              <div className="add-first-activity">Add an Activity</div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <div className="background-dark-cover"></div>
          <div className="jazz-timeline-wrapper">
            <div className="jazz-timeline solid-shadow">
              <div className="add-activity-icon">
                <AddIcon className="activity-icon"
                  onClick={() => this.handleCreateNewActivity(start)} />
              </div>
              {this.renderActivities(trip)}
              <div className="add-activity-icon">
                <AddIcon className="activity-icon"
                  onClick={() => this.handleCreateNewActivity(end)} />
              </div>
                {this.renderAddActivityIcons(trip)}
            </div>
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

export default connect(mapStateToProps, actions)(TripDetail);
