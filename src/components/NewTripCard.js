import React, { Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Card, CardTitle } from 'material-ui/Card';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../actions/';

// Validation functions for redux-form
const required = value => value == null ? 'Required' : undefined;

class NewTripCard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, };
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div className="error-alert">{this.props.errorMessage}</div>;
    }
  }

  clearErrorMessage() {
    if (this.props.errorMessage) {
      this.props.clearError();
    }
  }

  handleOpen() {
    this.setState({ open: true, });
  }

  handleClose() {
    this.setState({ open: false, });
  }

  handleCreateNewTrip({ tripName }) {
    const username = this.props.params.username;
    this.props.createTrip(username, tripName);
  }

  renderDialog() {
    const { handleSubmit, submitting, valid } = this.props
    const style = {
      error: {
        float: "left"
      },
      dialog: {
        width: '300px',
      },
    };

    return (
      <Dialog
        title="Create A New Trip"
        actions={null}
        modal={false}
        contentStyle={style.dialog}
        open={this.state.open}
        onRequestClose={() => this.handleClose()}
      >
        <form onSubmit={handleSubmit(this.handleCreateNewTrip.bind(this))}>
          <Field component={TextField}
            name="tripName"
            hintText="Trip Name"
            value="Default Value"
            validate={[required]}
            errorStyle={style.error}
            className="text-field"
            onClick={() => this.clearErrorMessage()}
          />
          {this.renderAlert()}
          <div style={{float: "right"}}>
            <FlatButton
              type="submit"
              disabled={ !valid || submitting}
              className="submit-button"
              >
              SUBMIT
            </FlatButton>
            <FlatButton
              className="submit-button"
              onClick={() => this.handleClose()}
              >
              CANCEL
            </FlatButton>
          </div>
        </form>
      </Dialog>
    );
  }

  render() {
    if (this.props.numTrips === 0) {
      return (
        <div>
          <div className="jazz-timeline-wrapper">
              <div className="add-trip-icon">
                <AddIcon className="trip-icon" onClick={() => this.handleOpen()} />
              </div>
            <div className="add-first-trip">Add a Trip</div>
          </div>
          {this.renderDialog()}
        </div>
      );
    }

    return (
      <div>
        <div className="jazz-timeline-wrapper">
            <div className="add-trip-icon">
              <AddIcon className="trip-icon" onClick={() => this.handleOpen()} />
            </div>
        </div>
        {this.renderDialog()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
  };
}

const newTripForm = reduxForm({
  form: 'newTrip',
})(NewTripCard);

export default withRouter(connect(mapStateToProps, actions)(newTripForm));
