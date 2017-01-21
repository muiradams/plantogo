import React, { Component } from 'react';
import { TextField } from 'redux-form-material-ui';
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
}

export default class Train extends Component {
  render() {
    return (
      <Row>
        <Column width="2/3">
          <Field component={TextField}
            name="activityName"
            floatingLabelText="Rail Service*"
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            style={style.fullLength}
          />
        </Column>
        <Column width="1/3">
          <Field component={TextField}
            name="transportNumber"
            floatingLabelText="Rail Line"
            errorStyle={style.error}
            className="text-field"
            style={style.fullLength}
          />
        </Column>
      </Row>
    )
  }
}
