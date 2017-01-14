import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { authError, clearError } from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.authError('Please sign in first');
        browserHistory.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.authError('Please sign in first');
        browserHistory.push('/')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps, { authError, clearError })(Authentication);
}
