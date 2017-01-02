import React, { Component} from 'react';
import { browserHistory } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

export default class NewTripCard extends Component {
  handleTouchTap() {
    // TODO: figure out where to send user to when they click to create new trip
    browserHistory.push('/');
   }

  render() {
    if (this.props.numTrips === 0) {
      return (
        <div className="jazz-timeline-wrapper">
            <div className="add-trip-icon">
              <AddIcon className="trip-icon" onClick={this.handleTouchTap.bind(this)} />
            </div>
          <div className="add-first-trip">Add a Trip</div>
        </div>
      );
    }

    return (
      <div className="jazz-timeline-wrapper">
          <div className="add-trip-icon">
            <AddIcon className="trip-icon" onClick={this.handleTouchTap.bind(this)} />
          </div>
      </div>
    );
  }
}
