import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addEvent } from "../../actions/events";

class Dashboard extends React.Component {
  render() {
    const { events } = this.props;
    if (!events) {
      return "Loading...";
    }
    return (
      <div className="container">
        <div className="page-header">Dashboard</div>
        <div className="page-content">
          {events.map(event => {
            return (
              <div className="event-item" key={event.eventID}>
                <h1>{event.eventName}</h1>
                <p>{event.eventDescription}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, events }) => ({
  userID: auth.user.userID,
  events: events.events
});

Dashboard.ProtoTypes = {
  auth: PropTypes.object,
  addEvent: PropTypes.func
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
