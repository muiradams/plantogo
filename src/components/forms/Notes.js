import React, { Component } from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Row, Column } from 'react-cellblock';

// Validation function for redux-form
const style = {
  fullLength: {
    width: "100%",
  },
}

export default class Notes extends Component {
  render() {
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
    )
  }
}
