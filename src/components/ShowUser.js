import React, { Component } from 'react';
import Header from './Header';

export default class ShowUser extends Component {
  isRootRoute() {
    if (!this.props.params.tripId) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div>
        <Header isRootRoute={this.isRootRoute()} />
        <div style={{paddingTop: '65px'}}>
        {this.props.children}
        </div>
      </div>
    );
  }
}
