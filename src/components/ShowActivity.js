import _ from 'lodash';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {Grid, Row, Column } from 'react-cellblock';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem'
import FlightIcon from 'material-ui/svg-icons/maps/flight';
import LodgingIcon from 'material-ui/svg-icons/maps/hotel';
import RestaurantIcon from 'material-ui/svg-icons/maps/local-dining';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';
import TrainIcon from 'material-ui/svg-icons/maps/train';
import BusIcon from 'material-ui/svg-icons/maps/directions-bus';
import MeetingIcon from 'material-ui/svg-icons/social/people';
import TourIcon from 'material-ui/svg-icons/maps/map';
import AttractionIcon from 'material-ui/svg-icons/maps/local-see';
import EventIcon from 'material-ui/svg-icons/maps/local-activity';
import FerryIcon from 'material-ui/svg-icons/maps/directions-boat';
import CruiseIcon from 'material-ui/svg-icons/hardware/toys';
import OtherIcon from 'material-ui/svg-icons/maps/place';
import { SelectField, TextField } from 'redux-form-material-ui';
import Flight from './forms/Flight';
import Lodging from './forms/Lodging';
import Restaurant from './forms/Restaurant';
import RentalCar from './forms/RentalCar';
import Train from './forms/Train';
import Bus from './forms/Bus';
import Meeting from './forms/Meeting';
import Tour from './forms/Tour';
import Attraction from './forms/Attraction';
import Event from './forms/Event';
import Ferry from './forms/Ferry';
import Cruise from './forms/Cruise';
import Other from './forms/Other';
import StartEnd from './forms/StartEnd';
import ConfirmationNumber from './forms/ConfirmationNumber';
import Notes from './forms/Notes';
import * as actions from '../actions';

// Validation function for redux-form
const required = value => value == null || value === '' ? 'Required' : undefined;

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
    let {
      startLocation,
      endLocation,
      transportNumber,
      address,
      confirmationNumber,
      notes
    } = formData;

    if (activityId) {
      // If user clears non-required fields, then notify backend to update database
      if (!startLocation) startLocation = { delete: true };
      if (!endLocation) endLocation = { delete: true };
      if (!notes) notes = { delete: true };
      if (!transportNumber) transportNumber = { delete: true };
      if (!address) address = { delete: true };
      if (!confirmationNumber) confirmationNumber = { delete: true };

      this.props.updateActivity(username, tripId, {
        ...formData,
        ...startAndEnd,
        startLocation,
        endLocation,
        transportNumber,
        address,
        confirmationNumber,
        notes,
      });
    } else {
      this.props.createActivity(username, tripId, {
        ...formData,
        ...startAndEnd,
        startLocation,
        endLocation,
        notes,
      });
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

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
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

  renderFormContents() {
    const { activityType, startDate, endDate } = this.props;
    let startLocation = '';
    if (this.props.initialValues) {
      startLocation = this.props.initialValues.startLocation;
    }

    switch (activityType) {
      case 'flight':
        return (
          <div>
            <Flight />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Departure'}
              endLabel={'Arrival'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'lodging':
        return (
          <div>
            <Lodging />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Check-in'}
              endLabel={'Check-out'}
              isToggleDisabled={true}
            />
            <ConfirmationNumber labelText={'Reservation'} />
            <Notes />
          </div>
        );
      case 'restaurant':
        return (
          <div>
            <Restaurant />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Reservation'}
              endLabel={'End'}
              isToggleDisabled={true}
            />
            <ConfirmationNumber labelText={'Reservation'} />
            <Notes />
          </div>
        );
      case 'car':
        return (
          <div>
            <RentalCar />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Pickup'}
              endLabel={'Return'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'train':
        return (
          <div>
            <Train />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Departure'}
              endLabel={'Arrival'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'bus':
        return (
          <div>
            <Bus />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Departure'}
              endLabel={'Arrival'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'meeting':
        return (
          <div>
            <Meeting />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Start'}
              endLabel={'End'}
              isToggleDisabled={true}
            />
            <Notes />
          </div>
        );
      case 'tour':
        return (
          <div>
            <Tour />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Start'}
              endLabel={'End'}
              location={startLocation}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'attraction':
        return (
          <div>
            <Attraction />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Start'}
              endLabel={'End'}
              isToggleDisabled={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'event':
        return (
          <div>
            <Event />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              isToggleDisabled={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'ferry':
        return (
          <div>
            <Ferry />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Departure'}
              endLabel={'Arrival'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'cruise':
        return (
          <div>
            <Cruise />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              startLabel={'Departure'}
              endLabel={'Arrival'}
              location={startLocation}
              isLocationRequired={true}
            />
            <ConfirmationNumber />
            <Notes />
          </div>
        );
      case 'other':
        return (
          <div>
            <Other />
            <StartEnd
              startDate={startDate}
              endDate={endDate}
              location={startLocation}
            />
            <Notes />
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
      <div  className="under-the-header">
        <Grid>
          <div className="background-dark-cover-activity"></div>
          <Paper className="form-container" zDepth={1}>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Row>
                <Column>
                  <Field component={SelectField}
                    name="activityType"
                    hintText="Activity Type*"
                    floatingLabelText="Activity Type*"
                    validate={[required]}
                    errorStyle={style.error}
                    className="text-field"
                    style={style.fullLength}
                    hintStyle={{left: "0px"}}
                    onClick={() => this.clearErrorMessage()}
                  >
                    <MenuItem value="flight" primaryText="Flight" leftIcon={<FlightIcon />} />
                    <MenuItem value="lodging" primaryText="Lodging" leftIcon={<LodgingIcon />} />
                    <MenuItem value="restaurant" primaryText="Restaurant" leftIcon={<RestaurantIcon />} />
                    <MenuItem value="car" primaryText="Car Rental" leftIcon={<CarIcon />} />
                    <MenuItem value="train" primaryText="Train" leftIcon={<TrainIcon />} />
                    <MenuItem value="bus" primaryText="Bus" leftIcon={<BusIcon />} />
                    <MenuItem value="meeting" primaryText="Meeting" leftIcon={<MeetingIcon />} />
                    <MenuItem value="tour" primaryText="Tour" leftIcon={<TourIcon />} />
                    <MenuItem value="attraction" primaryText="Attraction" leftIcon={<AttractionIcon />} />
                    <MenuItem value="event" primaryText="Event" leftIcon={<EventIcon />} />
                    <MenuItem value="ferry" primaryText="Ferry" leftIcon={<FerryIcon />} />
                    <MenuItem value="cruise" primaryText="Cruise" leftIcon={<CruiseIcon />} />
                    <MenuItem value="other" primaryText="Other" leftIcon={<OtherIcon />} />
                  </Field>
                </Column>
              </Row>
              {this.renderFormContents()}
              {this.renderAlert()}
              <Row>
                <Column width="1/3">
                  {this.renderDeleteButton()}
                </Column>
                <Column width="2/3" className="save-cancel-buttons">
                  <FlatButton
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
                </Column>
              </Row>
            </form>
            <div className="required-field-text">* required field</div>
          </Paper>
        </Grid>
      </div>
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
