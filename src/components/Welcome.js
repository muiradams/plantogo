import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Signin from './authentication/Signin';

export default class Welcome extends Component {
  render () {
    return(
      <div className="welcome">
        <div className="welcome-title">plan to go</div>
        <div className="welcome-page">
        <Paper className="login-container" zDepth={1}>
          <Signin />
        </Paper>
        </div>
      </div>
    );
  }
}
