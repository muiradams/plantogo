import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../../actions';

// Validation functions for redux-form
const usernameRequired = value => value == null ? 'Username Required' : undefined;
const usernameFormat = value => value &&
    !/^[A-Z0-9]+$/i.test(value) ? 'Must contain only letters and numbers' : undefined;
const passwordRequired = value => value == null ? 'Password Required' : undefined;
const passwordLength = value => value &&
  !/[A-Z0-9]{8,}/i.test(value) ? 'Must contain at least 8 characters' : undefined;
const passwordCharacters = value => value &&
  !/^[A-Z0-9]{8,}$/i.test(value) ? 'Must contain only letters and numbers' : undefined;

class Signin extends Component {
  handleSignup() {
    browserHistory.push('/signup');
  }

  handleForgotPassword() {
    browserHistory.push('/forgot');
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ username, password }) {
    this.props.signinUser({ username, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, valid } = this.props;
    const style = {
      error: {
        float: "left"
      }
    }

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field component={TextField}
          name="username"
          hintText="Username"
          validate={[usernameRequired, usernameFormat]}
          errorStyle={style.error}
          className="text-field"
          onClick={() => this.clearErrorMessage()}
        />
        <br />
        <Field component={TextField}
          name="password"
          hintText="Password"
          type="password"
          validate={[passwordRequired, passwordLength, passwordCharacters]}
          errorStyle={style.error}
          className="text-field"
          onClick={() => this.clearErrorMessage()}
          />
        {this.renderAlert()}
        <div><FlatButton
              type="submit"
              disabled={pristine || !valid || submitting}
              className="submit-button"
              >
              SIGN IN
            </FlatButton>
        </div>
        <div className="not-registered">
          <a className="sign-up-link"
            onClick={this.handleSignup}
            style={{cursor: "pointer"}}
          >Not registered? Sign up!</a>
          <br />
          <br />
          <a className="sign-up-link"
            onClick={this.handleForgotPassword}
            style={{cursor: "pointer"}}
          >Forgot username/password?</a>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const signInForm = reduxForm({
  form: 'signin',
})(Signin);

export default connect(mapStateToProps, actions)(signInForm);
