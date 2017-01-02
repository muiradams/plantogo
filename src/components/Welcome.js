import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class Welcome extends Component {
  render () {
    return(
      <div>
        <div>
          Welcome!
        </div>
        <div>
          <FlatButton label="SIGN IN" primary={true} />
        </div>
      </div>
    );
  }
}
