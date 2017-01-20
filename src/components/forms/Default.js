import _ from 'lodash';
import React, { Component } from 'react';
import moment from 'moment';
import { TextField, DatePicker, TimePicker } from 'redux-form-material-ui';
import { Field, formValueSelector, change } from 'redux-form';
import { Row, Column} from 'react-cellblock';

// Validation function for redux-form
const required = value => value == null ? 'Required' : undefined;

export default class Default extends Component {
  constructor(props) {
    super(props);

    const pastDate = moment('0001-01-01');
    const futureDate = moment('3000-01-01');
    const minDate = pastDate.clone().toDate();
    const maxDate = futureDate.clone().toDate();

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
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

  render() {
    const style = {
      error: {
        float: "left",
      },
      fullLength: {
        width: "100%",
      },
    }

    return (
      <div>
        <Row>
          <Column>
            <Field component={TextField}
              name="activityName"
              hintText="Activity Name"
              floatingLabelText="Activity Name"
              validate={[required]}
              errorStyle={style.error}
              className="text-field"
              style={style.fullLength}
            />
          </Column>
        </Row>
        <Row>
          <Column width="5/8">
            <Field component={DatePicker}
              name="startDate"
              hintText="Start Date"
              floatingLabelText="Start Date"
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
              hintText="Start Time"
              floatingLabelText="Start Time"
              format={null}
              validate={[required]}
              textFieldStyle={style.fullLength}
              className="text-field"
            />
          </Column>
        </Row>
        <Row>
          <Column width="5/8">
            <Field component={DatePicker}
              name="endDate"
              hintText="End Date"
              floatingLabelText="End Date"
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
              hintText="End Time"
              floatingLabelText="End Time"
              format={null}
              errorStyle={style.error}
              textFieldStyle={style.fullLength}
              className="text-field"
            />
          </Column>
        </Row>
      </div>
    )
  }
}
