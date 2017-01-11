import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import { saveMeasurements } from '../actions/';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripActivity extends Component {
  handleDelete() {
    // TODO
  }

  handleEditActivity() {
    const username = this.props.username;
    const tripId = this.props.tripId;
    const activityId = this.props.activityId;

    browserHistory.push(`/user/${username}/trip/${tripId}/activity/${activityId}`);
  }

  renderActivityIcon(activityType) {
    if (activityType === 'flight') {
      return <FlightIcon className="activity-icon" />;
    }

    return <CarIcon className="activity-icon" />;
  }

  render() {
    const activity = this.props.activity;
    const index = this.props.index;
    console.log(activity);
    console.log(this.props);
    return (
      <div className="timeline-post grey-post">
        <div className="timeline-meta activity-time">
          <div className="meta-details">{activity.startTime}</div>
        </div>
        <div className="timeline-icon icon-larger iconbg-indigo icon-color-white"
             onClick={this.handleEditActivity.bind(this)}>
          <div className="icon-placeholder">
            {this.renderActivityIcon(activity.activityType)}
          </div>
        </div>
        <Measure whitelist={['top']} onMeasure={({top}) => {
            this.props.saveMeasurements(top, index);
        }}>
          <div className="timeline-content" onClick={this.handleEditActivity.bind(this)}>
            <div className="delete-activity-icon">
              <AddIcon className="delete-icon" onClick={this.handleDelete.bind(this)} />
            </div>
            <h2 className="content-title">{activity.activityName}</h2>
            <div className="content-details">
              <p>{activity.notes}</p>
            </div>
          </div>
        </Measure>
        <div className="timeline-meta activity-time">
          <div className="meta-details">{activity.endTime}</div>
        </div>
      </div>
    );
  }
}

TripActivity.contextTypes = {
  router: PropTypes.object,
};

export default connect(null, { saveMeasurements })(TripActivity);
