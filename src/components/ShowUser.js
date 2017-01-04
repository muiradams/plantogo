import React, { Component } from 'react';
import Header from './Header';

export default class ShowUser extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{paddingTop: '65px'}}>
        {this.props.children}
        </div>
      </div>
    );
  }
}
