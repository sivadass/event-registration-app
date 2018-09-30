import React from "react";
import loader from "../../images/loading.svg";
import whiteLoader from "../../images/loading-white.svg";

const Loader = props => {
  return (
    <img
      src={props.inverted ? whiteLoader : loader}
      alt="Loading"
      height={props.size}
      width={props.size}
    />
  );
};

export default Loader;
