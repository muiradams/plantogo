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
  grayBackground: {
    background: "#EEEEEE",
  },
}

export default class Tour extends Component {
  render() {
    return (
      <div>
        <Row>
          <Column>
            <Field component={TextField}
              name="activityName"
              floatingLabelText="Tour Name*"
              validate={[required]}
              errorStyle={style.error}
              className="text-field"
              style={style.fullLength}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Field component={TextField}
              name="address"
              floatingLabelText="Tour Company"
              errorStyle={style.error}
              className="text-field"
              style={style.fullLength}
              inputStyle={style.grayBackground}
            />
          </Column>
        </Row>
      </div>
    )
  }
}
