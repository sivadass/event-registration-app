import React from "react";
import Icon from "./icons";

const EventMediaObject = ({ icon, title, content }) => {
  return (
    <div className="event-media-object">
      <div className="icon-wrapper">
        <Icon name={icon} size={36} />
      </div>
      <div className="details-wrapper">
        <span className="title">{title}</span>
        <span className="content">{content}</span>
      </div>
    </div>
  );
};

export default EventMediaObject;
