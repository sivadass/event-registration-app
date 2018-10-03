import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import EventForm from "../common/event-form";
import uuid from "uuid/v4";
import moment from "moment";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        eventID: uuid(),
        eventName: "",
        eventDescription: "",
        eventDuration: "",
        eventLocation: "",
        eventFees: "",
        eventTags: [],
        eventDate: moment(),
        eventMaxAllowedParticipants: "",
        eventCustomFields: [],
        eventCreator: this.props.userID
      }
    };
  }
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/" className="back-button">
            &larr;
          </Link>
          Add Event
        </div>
        <div className="page-content event-form-wrapper">
          <EventForm
            submitEventForm={this.props.addEvent}
            initialValues={this.state.initialValues}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userID: auth.user.userID
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEvent }, dispatch);
}

AddEvent.ProtoTypes = {
  auth: PropTypes.object,
  addEvent: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
