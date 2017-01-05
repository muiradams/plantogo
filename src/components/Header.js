import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signoutUser } from '../actions';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

class Header extends Component {
  handleTouchTap() {
    alert('onTouchTap triggered on the title component');
  }

  handleLogOut() {
    this.props.signoutUser();
    browserHistory.push('/');
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
        iconElementRight={
          <FlatButton onClick={this.handleLogOut.bind(this)} label="Logout" />
        }
        style={styles.bar}
      />
    );
  }
}

export default connect(null, { signoutUser })(Header);
