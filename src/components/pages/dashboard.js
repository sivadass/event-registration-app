import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addEvent } from "../../actions/events";
import { Link } from "react-router-dom";
import EventListItem from "../common/event-list-item";
import EmptyState from "../common/empty-state";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Dashboard extends React.Component {
  render() {
    const { events, userID } = this.props;
    let myEvents = events.filter(event => event.eventCreator === userID);
    let renderAllEvents = events.map(event => {
      let isGoing = false;
      if (event.attendees) {
        let index = event.attendees.findIndex(attendee => attendee === userID);
        if (index !== -1) {
          isGoing = true;
        }
      }
      return (
        <EventListItem event={event} key={event.eventID} isGoing={isGoing} />
      );
    });
    let renderMyEvents = myEvents.map(event => {
      return <EventListItem event={event} key={event.eventID} />;
    });
    if (!events) {
      return "Loading...";
    }
    return (
      <div className="container">
        <div className="page-header">Dashboard</div>
        <div className="page-content">
          <Tabs className="dashboard-tabs">
            <TabList>
              <Tab>All Events ({events.length})</Tab>
              <Tab>My Events ({myEvents.length})</Tab>
            </TabList>

            <TabPanel>
              {events.length > 0 ? (
                renderAllEvents
              ) : (
                <EmptyState
                  title="No events to show!"
                  message="Please create an event by clicking the ADD NEW EVENT button."
                />
              )}
            </TabPanel>
            <TabPanel>
              {myEvents.length > 0 ? (
                renderMyEvents
              ) : (
                <EmptyState
                  title="Create your first event!"
                  message="So that it will appear here."
                />
              )}
            </TabPanel>
          </Tabs>
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
  addEvent: PropTypes.func,
  events: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
