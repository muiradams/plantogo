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
const passwordRequired = value => value == null ? 'Password Required' : undefined;
const passwordLength = value => value &&
  !/[A-Z0-9]{8,}/i.test(value) ? 'Must contain at least 8 characters' : undefined;
const passwordCharacters = value => value &&
  !/^[A-Z0-9]{8,}$/i.test(value) ? 'Must contain only letters and numbers' : undefined;

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignUp: false, };
  }

  handleTouchTap() {
    if(this.state.isSignUp) {
      this.setState({ isSignUp: false });
    } else {
      this.setState({ isSignUp: true });
    }
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ email, password }) {
    if(this.state.isSignUp) {
      this.props.signupUser({ email, password });
    } else {
      this.props.signinUser({ email, password });
    }

  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
  }

  renderButton() {
    const { pristine, submitting, valid } = this.props;

    if(this.state.isSignUp) {
      return (
        <div>
          <div><FlatButton
                type="submit"
                disabled={pristine || !valid || submitting}
                className="submit-button"
                >
                SIGN UP
              </FlatButton>
          </div>
          <div className="not-registered">
            <span>Already have an account? </span>
            <a className="sign-up-link" onClick={this.handleTouchTap.bind(this)} style={{cursor: "pointer"}}>Sign In</a>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div><FlatButton
              type="submit"
              disabled={pristine || !valid || submitting}
              className="submit-button"
              >
              SIGN IN
            </FlatButton>
        </div>
        <div className="not-registered">
          <span>Not registered? </span>
          <a className="sign-up-link" onClick={this.handleTouchTap.bind(this)} style={{cursor: "pointer"}}>Sign Up!</a>
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const style = {
      error: {
        float: "left"
      }
    }

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field component={TextField}
          name="email"
          hintText="Email"
          validate={[emailRequired, emailFormat]}
          errorStyle={style.error}
          className="text-field"
          onClick={() => this.clearErrorMessage()}
          /><br />
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
        {this.renderButton()}
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
