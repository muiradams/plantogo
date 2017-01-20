import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import moment from 'moment';
import * as actions from '../actions/';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

class TripActivity extends Component {
  constructor(props) {
    super(props);

    this.activity = this.props.activity;
  }

  handleEditActivity() {
    const { username, tripId } = this.props.params;
    const activityId = this.activity._id;
    browserHistory.push(`/user/${username}/trip/${tripId}/activity/${activityId}`);
  }

  renderActivityIcon(activityType) {
    if (activityType === 'flight') {
      return <FlightIcon className="activity-icon" />;
    }

    return <CarIcon className="activity-icon" />;
  }

  renderNewActivityDate(activity, prevActivityDate) {
    if (activity) {
      const thisActivityDate = activity.start;
      const sameDate = moment(thisActivityDate).isSame(moment(prevActivityDate), 'day');
      if (prevActivityDate === null || !sameDate) {
        return (
          <div className="new-activity-date">
            {moment(activity.start).format("dddd (MMM D)")}
          </div>
        );
      }
    }
  }

  renderNotes(notes) {
    if (notes) {
      return (
        <span>
          <span><strong>Notes: </strong></span><span>{notes}</span>
        </span>
      );
    }
  }

  render() {
    const activity = this.activity;
    const { prevActivityDate, index } = this.props;

    return (
      <div className="timeline-post grey-post">
        {this.renderNewActivityDate(activity, prevActivityDate)}
        <div className="timeline-meta activity-time">
          <div className="meta-details">{moment(activity.start).format("h:mm a")}</div>
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
            <h2 className="content-title">{activity.activityName}</h2>
            <div className="content-details">
              <p>{this.renderNotes(activity.notes)}</p>
            </div>
          </div>
        </Measure>
        <div className="timeline-meta activity-time">
          <div className="meta-details">{activity.end ? moment(activity.end).format("h:mm a") : ""}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trip: state.trips.trip,
  }
}

export default withRouter(connect(mapStateToProps, actions)(TripActivity));
