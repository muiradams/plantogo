import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../actions';

// Validation functions for redux-form
const activityNameRequired = value => value == null ? 'Activity Name Required' : undefined;
const activityTypeRequired = value => value == null ? 'Activity Type Required' : undefined;
const startTimeRequired = value => value == null ? 'Start Time Required' : undefined;

class UpdateActivity extends Component {
  handleCancel() {
    browserHistory.goBack();
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleFormSubmit({ activityName, activityType, startTime }) {
    this.props.updateActivity({ activityName, activityType, startTime });
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
      <Paper className="form-container" zDepth={1}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field component={TextField}
            name="activityName"
            hintText="Activity Name"
            validate={[activityNameRequired]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <br />
          <Field component={TextField}
            name="activityType"
            hintText="Activity Type"
            validate={[activityTypeRequired]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
            />
            <br />
            <Field component={TextField}
              name="startTime"
              hintText="Start Time"
              validate={[startTimeRequired]}
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
                SAVE
              </FlatButton>
              <FlatButton
                className="submit-button"
                onClick={this.handleCancel}
                >
                CANCEL
              </FlatButton>
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const updateActivityForm = reduxForm({
  form: 'updateActivity',
})(UpdateActivity);

export default connect(mapStateToProps, actions)(updateActivityForm);
