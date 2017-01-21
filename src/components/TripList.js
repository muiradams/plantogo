import React, { Component } from 'react';
import { connect } from 'react-redux';
import  TripCard  from './TripCard';
import NewTripCard from './NewTripCard';
import * as actions from '../actions/';

class TripList extends Component {
  constructor(props) {
    super(props);
    this.username = props.params.username;
  }

  componentDidMount() {
    this.props.fetchTripList(this.username);
  }

  renderTripList(trips) {
    return trips.map((trip, index) => <TripCard trip={trip} key={trip._id} />);
  }

  render() {
    const trips = this.props.trips;

    return (
      <div>
        <NewTripCard numTrips={trips.length} />
        {this.renderTripList(trips)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips.allTrips,
  };
}

export default connect(mapStateToProps, actions)(TripList);
