import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

export default class Signin extends Component {
  render() {
    return(
      <div className="welcome">
        <div className="welcome-title">plan to go</div>
        <div className="welcome-page">
        <Paper className="login-container" zDepth={1}>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
             />
           <div><FlatButton className="login-button">SIGN UP</FlatButton></div>
        </Paper>
        </div>
      </div>
    );
  }
}
