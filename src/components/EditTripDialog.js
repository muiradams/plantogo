import React, { Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory, withRouter } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import {Grid, Row, Column} from 'react-cellblock';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'redux-form-material-ui';
import * as actions from '../actions/';

// Validation functions for redux-form
const required = value => value === '' ? 'Required' : undefined;

class EditTripDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, deleteOpen: false };
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

  handleDeleteOpen() {
    this.setState({ deleteOpen: true, });
  }

  handleDeleteClose() {
    this.setState({ deleteOpen: false, });
  }

  handleEditTrip({ tripName }) {
    const { username, tripId } = this.props.params;
    this.props.editTrip(username, tripId, tripName);
    this.handleClose();
  }

  handleDeleteTrip() {
    const { username, tripId } = this.props.params;
    this.props.deleteTrip(username, tripId);
  }

  renderDeleteButton() {
    const actions = [
      <FlatButton
        label="DELETE"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.handleDeleteTrip()}
      />,
      <FlatButton
        label="CANCEL"
        primary={true}
        onTouchTap={() => this.handleDeleteClose()}
      />,
    ];

    return (
      <div>
        <FlatButton
          className="delete-button"
          onClick={() => this.handleDeleteOpen()}
          >
          DELETE
        </FlatButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.deleteOpen}
          onRequestClose={() => this.handleDeleteClose()}
        >
          Are you sure you want to delete this trip?
        </Dialog>
      </div>
    );
  }

  renderDialog() {
    const { handleSubmit, submitting, valid } = this.props
    const style = {
      error: {
        float: "left"
      },
      dialog: {
        width: '375px',
      },
    };

    return (
      <Dialog
        title="Edit Trip"
        actions={null}
        modal={false}
        contentStyle={style.dialog}
        open={this.state.open}
        titleStyle={{padding: "30px 14px 20px 29px"}}
        bodyStyle={{padding: "0 14px 24px 14px"}}
        onRequestClose={() => this.handleClose()}
      >
        <Grid gutterWidth={10}>
            <form onSubmit={handleSubmit(this.handleEditTrip.bind(this))}>
              <Field component={TextField}
                name="tripName"
                hintText="Trip Name"
                validate={[required]}
                errorStyle={style.error}
                className="text-field"
                style={{marginLeft: "15px", width: "315px"}}
                onClick={() => this.clearErrorMessage()}
              />
              {this.renderAlert()}
              <div className="dialog-buttons">
                <Row>
                  <Column width="2/7">
                    {this.renderDeleteButton()}
                  </Column>
                  <Column width="1/7">
                  </Column>
                  <Column width="2/7">
                    <FlatButton
                      type="submit"
                      disabled={ !valid || submitting}
                      className="submit-button"
                      >
                      SAVE
                    </FlatButton>
                  </Column>
                  <Column width="2/7">
                    <FlatButton
                      className="submit-button"
                      onClick={() => this.handleClose()}
                      >
                      CANCEL
                    </FlatButton>
                  </Column>
                </Row>
              </div>
            </form>
        </Grid>
      </Dialog>
    );
  }

  render() {
    const tripName = this.props.trip.tripName;
    return (
      <div style={{cursor: "pointer"}} onClick={() => this.handleOpen()}>
        {tripName}
        <IconButton>
          <EditIcon className="edit-icon" />
        </IconButton>
        {this.renderDialog()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trip: state.trips.trip,
    errorMessage: state.auth.error,
    initialValues: { tripName: state.trips.trip.tripName },
  };
}

const editTripForm = reduxForm({
  form: 'editTrip',
  enableReinitialize: true,
})(EditTripDialog);

export default withRouter(connect(mapStateToProps, actions)(editTripForm));
