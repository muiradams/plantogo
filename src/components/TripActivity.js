import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import * as actions from '../actions/';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripActivity extends Component {
  constructor(props) {
    super(props);

    this.activity = this.props.activity;
  }

  handleDelete() {
    // TODO
  }

  handleEditActivity() {
    const username = this.props.username;
    const tripId = this.props.trip._id;
    const activityId = this.activity._id;
    this.props.setActivity(this.activity);
    browserHistory.push(`/user/${username}/trip/${tripId}/activity/${activityId}`);
  }

  renderActivityIcon(activityType) {
    if (activityType === 'flight') {
      return <FlightIcon className="activity-icon" />;
    }

    return <CarIcon className="activity-icon" />;
  }

  render() {
    const activity = this.activity;
    const index = this.props.index;

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

function mapStateToProps(state) {
  return {
    trip: state.trips.trip,
  }
}

export default connect(mapStateToProps, actions)(TripActivity);
