import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../../actions';

// Validation functions for redux-form
const passwordRequired = value => value == null ? 'Password Required' : undefined;
const passwordLength = value => value &&
  !/[A-Z0-9]{8,}/i.test(value) ? 'Must contain at least 8 characters' : undefined;
const passwordCharacters = value => value &&
  !/^[A-Z0-9]{8,}$/i.test(value) ? 'Must contain only letters and numbers' : undefined;

class Reset extends Component {
  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ password }) {
    const token = this.props.params.token;
    this.props.resetPassword({ password }, token);
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
        <div className="not-registered">Enter a new password:</div>
        <br />
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                SUBMIT
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

const resetForm = reduxForm({
  form: 'reset',
})(Reset);

export default connect(mapStateToProps, actions)(resetForm);
