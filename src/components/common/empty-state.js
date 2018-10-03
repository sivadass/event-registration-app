import React from "react";

const EmptyState = ({ title, message }) => {
  return (
    <div className="empty-state">
      <h1>{title ? title : "Sorry, no data!"}</h1>
      <p>{message ? message : "Please add some data!"}</p>
    </div>
  );
};

export default EmptyState;
