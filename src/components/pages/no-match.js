import React from "react";
import loading from "../../images/loading.svg";

class NoMatch extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="page-content">
          <h1>404!</h1>
          <p>Sorry, page not found.</p>
        </div>
      </div>
    );
  }
}

export default NoMatch;
