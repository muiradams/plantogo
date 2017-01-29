import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

class LoadingSpinner extends Component {
  render() {
    if (this.props.isFetching) {
      return(
        <div className="loading-background">
          <CircularProgress
            className="loading-spinner"
            size={50} thickness={5}
            color="#FFFFFF" />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return { isFetching: state.trips.isFetching };
}

export default connect(mapStateToProps)(LoadingSpinner);
