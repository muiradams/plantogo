import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { connect } from 'react-redux';
import Measure from 'react-measure';
import moment from 'moment';
import * as actions from '../actions/';
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import LodgingIcon from 'material-ui/svg-icons/maps/hotel';
import RestaurantIcon from 'material-ui/svg-icons/maps/local-dining';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import TrainIcon from 'material-ui/svg-icons/maps/train';
import BusIcon from 'material-ui/svg-icons/maps/directions-bus';
import MeetingIcon from 'material-ui/svg-icons/social/people';
import TourIcon from 'material-ui/svg-icons/maps/map';
import AttractionIcon from 'material-ui/svg-icons/maps/local-see';
import EventIcon from 'material-ui/svg-icons/maps/local-activity';
import FerryIcon from 'material-ui/svg-icons/maps/directions-boat';
import CruiseIcon from 'material-ui/svg-icons/hardware/toys';
import OtherIcon from 'material-ui/svg-icons/maps/place';
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
    switch(activityType) {
      case 'flight':
        return <FlightIcon className="activity-icon" />;
      case 'lodging':
        return <LodgingIcon className="activity-icon" />;
      case 'restaurant':
        return <RestaurantIcon className="activity-icon" />;
      case 'car':
        return <CarIcon className="activity-icon" />;
      case 'train':
        return <TrainIcon className="activity-icon" />;
      case 'bus':
        return <BusIcon className="activity-icon" />;
      case 'meeting':
        return <MeetingIcon className="activity-icon" />;
      case 'tour':
        return <TourIcon className="activity-icon" />;
      case 'attraction':
        return <AttractionIcon className="activity-icon" />;
      case 'event':
        return <EventIcon className="activity-icon" />;
      case 'ferry':
        return <FerryIcon className="activity-icon" />;
      case 'cruise':
        return <CruiseIcon className="activity-icon" />;
      default:
        return <OtherIcon className="activity-icon" />;
    }
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

  renderActivityName(activity) {
    const {
      activityType,
      activityName,
      isSecondPart,
      startLocation,
      endLocation,
      transportNumber,
    } = activity;

    const showTransportNumber = () => transportNumber ? transportNumber : '';

    switch(activityType) {
      case 'flight':
        return `Flight to ${endLocation}`;
      case 'lodging':
        if (isSecondPart) return `Check-out at ${activityName}`;
        return `Check-in at ${activityName}`;
      case 'restaurant':
        return `Dining at ${activityName}`;
      case 'car':
        if (isSecondPart) return 'Return Rental Car';
        return 'Pick-up Rental Car';
      case 'train':
        return `Train to ${endLocation}`;
      case 'bus':
        return `Bus to ${endLocation}`;
      case 'meeting':
        return `Meeting with ${activityName}`;
      case 'tour':
        return `Tour: ${activityName}`;
      case 'attraction':
        return `Visit ${activityName}`;
      case 'event':
        return `Attend ${activityName}`;
      case 'ferry':
        return `Ferry to ${endLocation}`;
      case 'cruise':
        return `Cruise on ${activityName} ${showTransportNumber()}`;
      default:
        return activityName;
    }
  }

  renderContent(activity) {
    const {
      activityType,
      activityName,
      isSecondPart,
      startLocation,
      endLocation,
      address,
      confirmationNumber,
      transportNumber,
      // start,
      // end,
    } = activity;

    if (isSecondPart) return;

    const showConfirmation = (confirmationType) => {
      if (confirmationNumber) {
        return (
          <div>
            <strong>{`${confirmationType} #: `}</strong>&nbsp;{confirmationNumber}
          </div>
        );
      }
    }

    const showAddress = () => {
      if (address) {
        return (
          <div>
          <strong>Address: </strong>&nbsp;{address}
          </div>
        );
      }
    }

    const showTransportNumber = (transportType) => {
      if (transportNumber) return `(${transportType}: ${transportNumber})`;
    }

    switch(activityType) {
      case 'flight':
        return (
          <div>
            <div>{activityName} {showTransportNumber('Flight #')}</div>
            <div>{startLocation} - {endLocation}</div>
            <div>{showConfirmation('Confirmation')}</div>
          </div>
        );
      case 'lodging':
      case 'restaurant':
        return (
          <div>
            <div>{showAddress()}</div>
            <div>{showConfirmation('Reservation')}</div>
          </div>
        );
      case 'car':
        return (
          <div>
            <div>{activityName} ({startLocation})</div>
            <div>{showConfirmation('Confirmation')}</div>
          </div>
        );
      case 'train':
      case 'bus':
      case 'ferry':
      return (
        <div>
          <div>{activityName} {showTransportNumber('Line')}</div>
          <div><strong>Depart:</strong> {startLocation}</div>
          <div>{showConfirmation('Confirmation')}</div>
        </div>
      );
      case 'attraction':
      case 'event':
      case 'meeting':
        return (
          <div>
            <div>{showAddress()}</div>
            <div>{showConfirmation('Confirmation')}</div>
          </div>
        );
      case 'tour':
        return (
          <div>
            <div>
              <div>{address} ({startLocation})</div>
            </div>
          </div>
        );
      case 'cruise':
        return (
          <div>
            <div><strong>Depart: </strong>&nbsp;{startLocation}</div>
            <div>{showConfirmation('Confirmation')}</div>
          </div>
        );
      default:
        return;
    }
  }

  renderNotes(notes) {
    if (notes) {
      let subString = notes;
      let shortNotes = notes;
      let maxLength = 50;

      if (notes.includes('\n')) {
        subString = notes.substring(0, notes.indexOf('\n'));
      }

      if (subString.length > maxLength || notes.includes('\n')) {
        shortNotes = subString.substr(0, maxLength) + " ...";
      } else {
        shortNotes = subString;
      }

      return <p><strong>Notes:&nbsp; </strong><span>{shortNotes}</span></p>;
    }
  }

  renderEndTime(activity) {
    const { activityType, end, start } = activity;
    if (end) {
      if (activityType === 'car' || activityType === 'lodging') {
        return;
      }

      if (end) {
        const startTime = moment(start);
        const endTime = moment(end);
        if (endTime.isAfter(startTime, 'day')) {
          return moment(end).format("h:mm a (dddd, MMM D)");
        }

        return moment(end).format("h:mm a");
      }
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
            <h2 className="content-title">{this.renderActivityName(activity)}</h2>
            <div className="content-details">
              <div className="content">{this.renderContent(activity)}</div>
              {this.renderNotes(activity.notes)}
            </div>
          </div>
        </Measure>
        <div className="timeline-meta activity-time">
          <div className="meta-details">{this.renderEndTime(activity)}</div>
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
