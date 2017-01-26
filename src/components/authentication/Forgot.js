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

class Forgot extends Component {
  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ email }) {
    this.props.forgotPassword({ email });
  }

  handleCancel() {
    browserHistory.push('/');
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
        <div className="not-registered">Recover your username/password:</div>
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
          {this.renderAlert()}
          <div><FlatButton
                type="submit"
                disabled={pristine || !valid || submitting}
                className="submit-button"
                >
                SUBMIT
              </FlatButton>
              <FlatButton
                className="submit-button"
                onClick={() => this.handleCancel()}
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

const forgotForm = reduxForm({
  form: 'forgot',
})(Forgot);

export default connect(mapStateToProps, actions)(forgotForm);
