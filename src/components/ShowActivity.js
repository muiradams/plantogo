import _ from 'lodash';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {Grid, Row, Column} from 'react-cellblock';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem'
import { SelectField, TextField } from 'redux-form-material-ui';
import Default from './forms/Default';
import * as actions from '../actions';

// Validation function for redux-form
const required = value => value == null ? 'Required' : undefined;

class ShowActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { username, tripId, activityId } = this.props.params;
    if(activityId) {
      this.props.fetchActivity(username, tripId, activityId);
    }
  }

  handleCancel() {
    browserHistory.goBack();
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
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

  handleDelete() {
    const { username, tripId, activityId } = this.props.params;
    this.props.deleteActivity(username, tripId, activityId);
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

    if (endDate && _.isEmpty(endDate) && _.isEmpty(endTime)) {
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

  renderDeleteButton() {
    if (this.props.params.activityId) {
      const actions = [
        <FlatButton
          label="DELETE"
          primary={true}
          keyboardFocused={true}
          onTouchTap={() => this.handleDelete()}
        />,
        <FlatButton
          label="CANCEL"
          primary={true}
          onTouchTap={() => this.handleClose()}
        />,
      ];

      return (
        <div>
          <FlatButton
            className="delete-button"
            onClick={() => this.handleOpen()}
            >
            DELETE
          </FlatButton>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.handleClose()}
          >
            Are you sure you want to delete this activity?
          </Dialog>
        </div>
      );
    }
  }

  renderNotesField() {
    const style = {
      fullLength: {
        width: "100%",
      },
    }

    return (
      <Row>
        <Column>
          <Field
            name="notes"
            component={TextField}
            floatingLabelText="Notes"
            multiLine={true}
            rowsMax={4}
            style={style.fullLength}
          />
        </Column>
      </Row>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
  }

  renderFormContents() {
    const { activityType, startDate, endDate } = this.props;

    switch (activityType) {
      case 'flight':
        return (
          <div>
            <Default startDate={startDate} endDate={endDate} />
            {this.renderNotesField()}
          </div>
        );
      case 'car':
        return (
          <div>
            <Default startDate={startDate} endDate={endDate} />
            {this.renderNotesField()}
          </div>
        );
      case 'train':
        return (
          <div>
            <Default startDate={startDate} endDate={endDate} />
            {this.renderNotesField()}
          </div>
        );
      case 'other':
        return (
          <div>
            <Default startDate={startDate} endDate={endDate} />
            {this.renderNotesField()}
          </div>
        );
    }
  }

  render() {
    const activity = this.props.activity;
    const { handleSubmit, submitting, valid } = this.props;
    const style = {
      error: {
        float: "left",
      },
      fullLength: {
        width: "100%",
      },
    }

    return(
      <Grid>
        <div className="background-dark-cover"></div>
        <Paper className="form-container" zDepth={1}>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Row>
              <Column>
                <Field component={SelectField}
                  name="activityType"
                  hintText="Activity Type"
                  floatingLabelText="Activity Type"
                  validate={[required]}
                  errorStyle={style.error}
                  className="text-field"
                  style={style.fullLength}
                  hintStyle={{left: "0px"}}
                  onClick={() => this.clearErrorMessage()}
                >
                  <MenuItem value="flight" primaryText="Flight"/>
                  <MenuItem value="car" primaryText="Car Rental"/>
                  <MenuItem value="train" primaryText="Train"/>
                  <MenuItem value="other" primaryText="Other"/>
                </Field>
              </Column>
            </Row>
            {this.renderFormContents()}
            {this.renderAlert()}
            <Row>
              <Column width="4/14">
                {this.renderDeleteButton()}
              </Column>
              <Column width="2/14"></Column>
              <Column width="4/14">
                <FlatButton
                  type="submit"
                  disabled={ !valid || submitting}
                  className="submit-button"
                  >
                  SAVE
                </FlatButton>
              </Column>
              <Column width="4/14">
                <FlatButton
                  className="submit-button"
                  onClick={() => this.handleCancel()}
                  >
                  CANCEL
                </FlatButton>
              </Column>
            </Row>
          </form>
        </Paper>
      </Grid>
    );
  }
}

const showActivityForm = reduxForm({
  form: 'showActivity',
})(ShowActivity);

const selector = formValueSelector('showActivity');

function mapStateToProps(state) {
  return {
    fields: state.form.showActivity,
    activityType: selector(state, 'activityType'),
    startDate: selector(state, 'startDate'),
    endDate: selector(state, 'endDate'),
    activity: state.trips.activity,
    errorMessage: state.auth.error,
    initialValues: state.trips.activity,
  };
}

export default connect(mapStateToProps, actions)(showActivityForm);
