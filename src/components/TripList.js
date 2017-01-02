import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTripList } from '../actions/';
import  TripCard  from './TripCard';
import NewTripCard from './NewTripCard';

class TripList extends Component {
  constructor(props) {
    super(props);
    this.username = props.params.username;
  }

  componentWillMount() {
    this.props.fetchTripList();
  }

  renderTripList(trips) {
    return trips.map(trip => <TripCard trip={trip} username={this.username} key={trip.tripName} />);
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
  return { trips: state.trips.allTrips };
  // For testing: view layout without any trips created
  // return { trips: [] };
}

export default connect(mapStateToProps, { fetchTripList })(TripList);
