import React, { Component } from 'react';
import { setUsername } from '../actions';
import Header from './Header';

export default class ShowUser extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="under-the-header">
        {this.props.children}
        </div>
      </div>
    );
  }
}
