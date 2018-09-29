import React from "react";
import loading from "../../images/loading.svg";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <img src={loading} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
