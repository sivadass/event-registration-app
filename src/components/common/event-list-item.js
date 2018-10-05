import React from "react";
import { Link } from "react-router-dom";
import Icon from "./icons";
import moment from "moment";

const EventListItem = ({ event, isGoing }) => {
  return (
    <Link
      className="event-item"
      key={event.eventID}
      to={`/events/${event.eventID}/`}
    >
      <div className="event-item-time">
        <span className="date">{moment(event.eventDate).format("Do MMM")}</span>
        <span className="time">
          {moment(event.eventDate).format("hh:mm A")}
        </span>
      </div>
      <div className="event-item-meta">
        <h4>{event.eventName}</h4>
        {isGoing && (
          <span className="status" title="You are going!">
            <Icon name="check" size={20} />
          </span>
        )}
        <p>
          <Icon name="location" size={14} />
          {event.eventLocation ? event.eventLocation.label : ""}
        </p>
        <p>
          <Icon name="duration" size={14} />
          {event.eventDuration} Hours
        </p>
      </div>
    </Link>
  );
};

export default EventListItem;
