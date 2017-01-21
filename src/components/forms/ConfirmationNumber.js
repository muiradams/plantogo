import React, { Component } from 'react';
import { TextField } from 'redux-form-material-ui';
import { Field } from 'redux-form';
import { Row, Column } from 'react-cellblock';

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

export default class ConfirmationNumber extends Component {
  render() {
    let { labelText } = this.props;
    if (!labelText) labelText = 'Confirmation';

    return (
      <Row>
        <Column>
          <Field component={TextField}
            name="confirmationNumber"
            floatingLabelText={`${labelText} #`}
            errorStyle={style.error}
            className="text-field"
            style={style.fullLength}
            inputStyle={style.grayBackground}
          />
        </Column>
      </Row>
    )
  }
}
