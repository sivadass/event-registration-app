import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div className="container authentication">
        <div className="wrapper">
          <h1>Sign In</h1>
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Adress"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button className="button primary" type="button">
              Login
            </button>
            <span className="sub-text">New User?</span>
            <Link to="/register" className="button button-link">
              Register here
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
