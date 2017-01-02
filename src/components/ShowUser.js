import React, { Component } from 'react';
import Header from './Header';

export default class ShowUser extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
