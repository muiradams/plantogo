import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../../actions';

// Validation functions for redux-form
const emailRequired = value => value == null ? 'Email Required' : undefined;
const emailFormat = value => value &&
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid Email' : undefined;
const usernameRequired = value => value == null ? 'Username Required' : undefined;
const usernameFormat = value => value &&
    !/^[A-Z0-9]+$/i.test(value) ? 'Must contain only letters and numbers' : undefined;
const passwordRequired = value => value == null ? 'Password Required' : undefined;
const passwordLength = value => value &&
  !/[A-Z0-9]{8,}/i.test(value) ? 'Must contain at least 8 characters' : undefined;
const passwordCharacters = value => value &&
  !/^[A-Z0-9]{8,}$/i.test(value) ? 'Must contain only letters and numbers' : undefined;

class Signup extends Component {
  handleTouchTap() {
    browserHistory.push('/');
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ email, username, password }) {
    this.props.signupUser({ email, username, password });
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
      <div>
        <div className="not-registered">Sign up and start your planning!</div>
        <br />
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field component={TextField}
            name="email"
            hintText="Email"
            validate={[emailRequired, emailFormat]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <br />
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
                SIGN UP
              </FlatButton>
              <FlatButton
                className="submit-button"
                onClick={() => this.handleTouchTap()}
                >
                CANCEL
              </FlatButton>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const signupForm = reduxForm({
  form: 'signup',
})(Signup);

export default connect(mapStateToProps, actions)(signupForm);
