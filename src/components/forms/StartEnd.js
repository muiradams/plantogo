import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import Toggle from 'material-ui/Toggle';
import { TextField, DatePicker, TimePicker } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Row, Column } from 'react-cellblock';

// Validation function for redux-form
const required = value => value == null || value === '' ? 'Required' : undefined;
const style = {
  error: {
    float: "left",
  },
  fullLength: {
    width: "100%",
  },
  toggle: {
    marginTop: "20px",
  },
  grayBackground: {
    background: "#EEEEEE",
  },
}

export default class StartEnd extends Component {
  constructor(props) {
    super(props);

    const pastDate = moment('0001-01-01');
    const futureDate = moment('3000-01-01');
    const minDate = pastDate.clone().toDate();
    const maxDate = futureDate.clone().toDate();

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      isLocationToggled: false,
    };
  }

  setMinAndMaxDate() {
    const { startDate, endDate } = this.props;

    if (_.isEmpty(endDate)) {
      this.setState({
        maxDate: endDate,
      });
    }

    if (_.isEmpty(startDate)) {
      this.setState({
        minDate: startDate,
      });
    }
  }

  formatDate(date) {
    return moment(date).format('MMMM D, YYYY');
  }

  handleLocationToggle() {
    this.setState({ isLocationToggled: !this.state.isLocationToggled });
  }

  renderToggle(startLabel, endLabel) {
    return (
      <Row>
        <Column>
          <Toggle
            label={`Add ${startLabel.toLowerCase()} and ${endLabel.toLowerCase()} locations`}
            labelPosition="right"
            style={style.toggle}
            labelStyle={{color: "#999999"}}
            onToggle={this.handleLocationToggle.bind(this)}
          />
        </Column>
      </Row>
    );
  }

  renderLocation(isStart, startLabel, endLabel, isLocationRequired) {
    let nameLabel = 'start';
    let hintLabel = startLabel;

    if (!isStart) {
      nameLabel = 'end';
      hintLabel = endLabel;
    }

    return (
      <div>
      <Row>
        <Column>
          <Field component={TextField}
            name={`${nameLabel}Location`}
            hintText={`${hintLabel} Location`}
            floatingLabelText={isLocationRequired ? `${hintLabel} Location*` : `${hintLabel} Location` }
            validate={isLocationRequired ? [required] : null}
            errorStyle={style.error}
            className="text-field"
            style={style.fullLength}
            inputStyle={style.grayBackground}
          />
        </Column>
      </Row>
    </div>
    );
  }

  render() {
    let {
      startLabel,
      endLabel,
      location,
      isLocationRequired,
      isToggleDisabled
    } = this.props;

    if (!startLabel) startLabel = 'Start';
    if (!endLabel) endLabel = 'End';
    if (!isLocationRequired) isLocationRequired = false;
    if (!isToggleDisabled) isToggleDisabled = false;

    return (
      <div>
        {location || isLocationRequired || this.state.isLocationToggled ? this.renderLocation(true, startLabel, endLabel, isLocationRequired) : null}
        <Row>
          <Column width="5/8">
            <Field component={DatePicker}
              name="startDate"
              hintText={`${startLabel} Date*`}
              floatingLabelText={`${startLabel} Date*`}
              maxDate={this.state.maxDate}
              format={null}
              formatDate={this.formatDate}
              validate={[required]}
              className="text-field"
              textFieldStyle={style.fullLength}
              onClick={() => this.setMinAndMaxDate()}
            />
          </Column>
          <Column width="3/8">
            <Field component={TimePicker}
              name="startTime"
              hintText="Time*"
              floatingLabelText="Time*"
              format={null}
              validate={[required]}
              textFieldStyle={style.fullLength}
              className="text-field"
            />
          </Column>
        </Row>
        {location || isLocationRequired || this.state.isLocationToggled ? this.renderLocation(false, startLabel, endLabel, isLocationRequired) : null}
        <Row>
          <Column width="5/8">
            <Field component={DatePicker}
              name="endDate"
              hintText={`${endLabel} Date`}
              floatingLabelText={`${endLabel} Date`}
              minDate={this.state.minDate}
              defaultDate={this.state.minDate}
              format={null}
              formatDate={this.formatDate}
              className="text-field"
              textFieldStyle={style.fullLength}
              onClick={() => this.setMinAndMaxDate()}
            />
          </Column>
          <Column width="3/8">
            <Field component={TimePicker}
              name="endTime"
              hintText="Time"
              floatingLabelText="Time"
              format={null}
              errorStyle={style.error}
              textFieldStyle={style.fullLength}
              className="text-field"
            />
          </Column>
        </Row>
        { !isToggleDisabled && !location && !isLocationRequired ? this.renderToggle(startLabel, endLabel) : null }
      </div>
    )
  }
}
