import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import  TripCard  from './TripCard';
import NewTripButton from './NewTripButton';
import * as actions from '../actions/';

class TripList extends Component {
  constructor(props) {
    super(props);
    this.username = props.params.username;
    this.state = { isShowingPastTrips: false }
  }

  componentDidMount() {
    this.props.fetchTripList(this.username);
  }

  handleTouchTap() {
    this.setState({ isShowingPastTrips: !this.state.isShowingPastTrips });
  }

  renderTripButtons(isPastTrips) {
    if (isPastTrips) {
      if (this.state.isShowingPastTrips) {
        return (
          <RaisedButton
            label="Show Upcoming Trips"
            className="current-past-trips-button"
            onClick={this.handleTouchTap.bind(this)}
          />
        );
      }

      return (
        <RaisedButton
          label="Show Past Trips"
          className="current-past-trips-button"
          onClick={this.handleTouchTap.bind(this)}
        />
      );
    }
  }

  renderTripList(trips) {
    return trips.map((trip, index) => <TripCard trip={trip} key={trip._id} />);
  }

  render() {
    if (this.props.isFetching) {
      return <CircularProgress className="loading-spinner" size={50} thickness={5} />;
    }

    const trips = this.props.trips;
    let tripsToShow = []
    let upcomingTrips = [];
    let pastTrips = [];
    let isPastTrips = false;

    if (trips.length > 0) {
      upcomingTrips = trips.filter(trip => !trip.isTripOver);
      pastTrips = trips.filter(trip => trip.isTripOver);
      isPastTrips = pastTrips.length > 0 ? true: false;
      tripsToShow = this.state.isShowingPastTrips ? pastTrips : upcomingTrips;

      if (isPastTrips) {
        return (
          <div className="under-the-header-with-button">
            {this.renderTripButtons(isPastTrips)}
            <NewTripButton numTrips={tripsToShow.length} />
            {this.renderTripList(tripsToShow)}
          </div>
        );
      }
    }

    return (
      <div className="under-the-header">
        {this.renderTripButtons(isPastTrips)}
        <NewTripButton numTrips={tripsToShow.length} />
        {this.renderTripList(tripsToShow)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips.allTrips,
    isFetching: state.trips.isFetching,
  };
}

export default connect(mapStateToProps, actions)(TripList);
