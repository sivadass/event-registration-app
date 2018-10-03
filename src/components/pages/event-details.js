import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import Icon from "../common/icons";
import EventMediaObject from "../common/event-media-object";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteEvent } from "../../actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

class EventDetails extends React.Component {
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

  handleDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteEvent(this.props.match.params.id)
        },
        {
          label: "No"
        }
      ]
    });
  };

  render() {
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
          Event Details
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-8">
              <div className="event-meta">
                <h1>{eventData.eventName}</h1>
                <p>
                  <span className="event-meta-item">
                    <Icon name="user" size={16} />
                    Hosted by <strong>Sivadass N</strong>
                  </span>
                </p>
              </div>
              <div className="event-banner">
                <img
                  src="https://via.placeholder.com/700x300"
                  alt="event banner"
                />
              </div>
              <div className="event-description">
                {eventData.eventDescription}
              </div>
            </div>
            <div className="col-4">
              <div className="event-sidebar">
                <h3>Event Details</h3>
                <EventMediaObject
                  icon="calendar"
                  title="Date"
                  content={eventData.eventDate}
                />
                <EventMediaObject
                  icon="duration"
                  title="Duration"
                  content={`${eventData.eventDuration} Hours`}
                />
                <EventMediaObject
                  icon="location"
                  title="Location"
                  content={
                    eventData.eventLocation ? eventData.eventLocation.label : ""
                  }
                />
                <EventMediaObject
                  icon="price"
                  title="Price"
                  content={`$ ${eventData.eventFees}`}
                />
                <EventMediaObject
                  icon="users"
                  title="Maximum Allowed"
                  content={eventData.eventMaxAllowedParticipants}
                />
                {userID !== eventData.eventCreator && (
                  <div className="event-actions">
                    <Link to="/" className="button primary button-link">
                      RSVP NOW
                    </Link>
                  </div>
                )}
              </div>
              {userID === eventData.eventCreator && (
                <div className="event-sidebar creator-options">
                  <h3>Update Event</h3>
                  <div className="event-actions">
                    <Link
                      to={`/events/${this.props.match.params.id}/edit/`}
                      className="button button-link"
                    >
                      <Icon name="edit" size="18" />
                      EDIT
                    </Link>
                    <button className="button" onClick={this.handleDelete}>
                      <Icon name="trash" size="18" /> DELTE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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
  return bindActionCreators({ deleteEvent }, dispatch);
}

EventDetails.ProtoTypes = {
  events: PropTypes.array,
  userID: PropTypes.string,
  deleteEvent: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);
