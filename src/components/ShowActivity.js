import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { DatePicker, TextField, TimePicker } from 'redux-form-material-ui';
import * as actions from '../actions';

// Validation functions for redux-form
const required = value => value == null ? 'Required' : undefined;

class ShowActivity extends Component {
  componentDidMount() {
    const { username, tripId, activityId } = this.props.params;
    if(activityId) {
      this.props.fetchActivity(username, tripId, activityId);
    }
  }

  handleCancel() {
    browserHistory.goBack();
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  combineDateTime(formData) {
    const { startDate, startTime, endDate, endTime } = formData;
    const start = moment({
      year: startDate.getFullYear(),
      month: startDate.getMonth(),
      day: startDate.getDate(),
      hour: startTime.getHours(),
      minute: startTime.getMinutes(),
    });

    if (endDate) {
      const end = moment({
        year: endDate.getFullYear(),
        month: endDate.getMonth(),
        day: endDate.getDate(),
        hour: endTime.getHours(),
        minute: endTime.getMinutes(),
      });

      return { start, end };
    }

    return { start };
  }

  handleFormSubmit(formData) {
    const { username, tripId, activityId } = this.props.params;
    const startAndEnd = this.combineDateTime(formData);

    if (activityId) {
      this.props.updateActivity(username, tripId, { ...formData, ...startAndEnd });
    } else {
      this.props.createActivity(username, tripId, { ...formData, ...startAndEnd });
    }
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
  }

  render() {
    const activity = this.props.activity;
    const { handleSubmit, submitting, valid } = this.props;
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
            value="Default Value"
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <br />
          <Field component={TextField}
            name="activityType"
            hintText="Activity Type"
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <br />
          <Field component={DatePicker}
            name="startDate"
            hintText="Start Date"
            format={null}
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <Field component={TimePicker}
            name="startTime"
            hintText="Start Time"
            format={null}
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <Field component={DatePicker}
            name="endDate"
            hintText="End Date"
            format={null}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          <Field component={TimePicker}
            name="endTime"
            hintText="End Time"
            format={null}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          {this.renderAlert()}
          <div><FlatButton
                type="submit"
                disabled={ !valid || submitting}
                className="submit-button"
                >
                SAVE
              </FlatButton>
              <FlatButton
                className="submit-button"
                onClick={() => this.handleCancel()}
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
  return {
    activity: state.trips.activity,
    errorMessage: state.auth.error,
    initialValues: state.trips.activity,
  };
}

const showActivityForm = reduxForm({
  form: 'showActivity',
})(ShowActivity);

export default connect(mapStateToProps, actions)(showActivityForm);
