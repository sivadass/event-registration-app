import React from "react";
import location from "../../images/map-pin.svg";
import duration from "../../images/clock.svg";
import calendar from "../../images/calendar.svg";
import user from "../../images/user.svg";
import users from "../../images/users.svg";
import remove from "../../images/x-circle.svg";
import tag from "../../images/tag.svg";
import trash from "../../images/trash-2.svg";
import add from "../../images/plus-circle.svg";
import addWhite from "../../images/plus-circle-white.svg";
import check from "../../images/check-circle.svg";

const renderIcon = name => {
  switch (name) {
    case "location":
      return location;
    case "duration":
      return duration;
    case "calendar":
      return calendar;
    case "user":
      return user;
    case "users":
      return users;
    case "remove":
      return remove;
    case "tag":
      return tag;
    case "add":
      return add;
    case "add-white":
      return addWhite;
    default:
      return check;
  }
};

const Icon = ({ name, size }) => {
  return (
    <img
      className={`icon icon-${name}`}
      src={renderIcon(name)}
      height={size || 14}
      width={size || 14}
      alt="icon"
    />
  );
};

export default Icon;
