import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import { saveMeasurements } from '../actions/';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripActivity extends Component {
  handleTouchTap() {
    // TODO
   }

  render() {
    const activity = this.props.activity;
    const index = this.props.index;
    return (
      <div className="timeline-post grey-post">
        <div className="timeline-meta activity-time">
          <div className="meta-details">{activity.startTime}</div>
        </div>
        <div className="timeline-icon icon-larger iconbg-indigo icon-color-white">
          <div className="icon-placeholder">
            <FlightIcon className="activity-icon" />
          </div>
        </div>
        <Measure whitelist={['top']} onMeasure={({top}) => {
            this.props.saveMeasurements(top, index);
        }}>
          <div className="timeline-content">
            <div className="delete-activity-icon">
              <AddIcon className="delete-icon" onClick={this.handleTouchTap.bind(this)} />
            </div>
            <h2 className="content-title">{activity.activityName}</h2>
            <div className="content-details">
              <p>{activity.info}</p>
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
