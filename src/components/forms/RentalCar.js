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

export default class RentalCar extends Component {
  render() {
    return (
      <Row>
        <Column>
          <Field component={TextField}
            name="activityName"
            floatingLabelText="Rental Car Company*"
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            style={style.fullLength}
          />
        </Column>
      </Row>
    )
  }
}
