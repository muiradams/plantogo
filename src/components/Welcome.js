import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Signin from './authentication/Signin';

export default class Welcome extends Component {
  handleTouchTap() {
    browserHistory.push('/');
  }

  render () {
    return(
      <div className="welcome">
        <div className="welcome-title">
          <a onClick={this.handleTouchTap} style={{cursor: "pointer"}}>
            <img src="../../images/PlanToGo-Logo.png" width="150px" />
          </a>
          <div>PlanToGo</div>
        </div>
        <div className="welcome-page">
        <Paper className="login-container" zDepth={1}>
          {this.props.children}
        </Paper>
        </div>
      </div>
    );
  }
}
