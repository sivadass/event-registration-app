import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownActive: false
    };
  }
  toggleDropdown = e => {
    e.preventDefault();
    this.setState({
      isDropdownActive: !this.state.isDropdownActive
    });
  };
  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isDropdownActive } = this.state;
    const { isAuthenticated } = this.props;
    let renderUserMenu = (
      <div className="user-menu">
        <a href="#" className="trigger" onClick={this.toggleDropdown}>
          <img src={avatar} alt="Avatar" />{" "}
          {/* <span>{typeof fullName !== "undefined" && fullName}</span> */}
        </a>
        <div className={isDropdownActive ? "dropdown active" : "dropdown"}>
          <ul>
            <li>
              <a>Profile</a>
              <a href="#" onClick={this.handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
    let renderAuthButtons = (
      <div>
        <Link to="/register" className="header-button secondary">
          Register
        </Link>
        <Link to="/login" className="header-button">
          Login
        </Link>
      </div>
    );
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Madras Meetups" />
            </Link>
          </div>
          {isAuthenticated && (
            <Link to="/add-event/" className="header-button add-new">
              + ADD NEW EVENT
            </Link>
          )}
          {isAuthenticated ? renderUserMenu : renderAuthButtons}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
  //fullName: auth.user.fullName
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

Header.ProtoTypes = {
  auth: PropTypes.object,
  logoutUser: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
