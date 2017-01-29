import React, { Component } from 'react';
import { setUsername } from '../actions';
import Header from './Header';

export default class ShowUser extends Component {
  render() {
    return (
      <div className="show-user-container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
