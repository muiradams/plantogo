import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

export default class Header extends Component {
  handleTouchTap() {
    alert('onTouchTap triggered on the title component');
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
        position: 'relative',
        left: '15px',
        fontFamily: '"Roboto", Arial, Helvetica, sans-serif',
        fontWeight: 100,
      },
      bar: {
        background: '#303F9F',
        position: 'fixed',
      }
    };

    return(
      <AppBar
        title={<span style={styles.title}>plan to go</span>}
        onTitleTouchTap={this.handleTouchTap}
        iconElementRight={<FlatButton label="Logout" />}
        style={styles.bar}
      />
    );
  }
}
