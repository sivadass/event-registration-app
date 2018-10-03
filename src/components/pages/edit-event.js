import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { editEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import EventForm from "../common/event-form";

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      eventData: {}
    };
  }

  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails = () => {
    this.setState({
      isLoading: true
    });
    let events = this.props.events;
    if (events) {
      let eventID = this.props.match.params.id;
      let index = events.findIndex(event => event.eventID == eventID);
      if (index !== -1) {
        console.log("000", events[index]);
        this.setState({
          eventData: events[index]
        });
      }
      setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 1000);
    }
  };
  render() {
    console.log("edit", this.state.eventData);
    const { isLoading, eventData } = this.state;
    const { userID } = this.props;
    console.log("creator : ", userID);
    if (isLoading) {
      return (
        <div className="page-loading">
          <Loader />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/" className="back-button">
            &larr;
          </Link>
          Edit Event
        </div>
        <div className="page-content event-form-wrapper">
          <EventForm
            isEditing={true}
            userID={this.props.userID}
            submitEventForm={this.props.editEvent}
            initialValues={this.state.eventData}
            handleEventUpdate={this.getEventDetails}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, events }) => ({
  userID: auth.user.userID,
  events: events.events
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editEvent }, dispatch);
}

EditEvent.ProtoTypes = {
  auth: PropTypes.object,
  editEvent: PropTypes.func,
  events: PropTypes.arrray
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent);
