import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/auth";
import Icon from "../common/icons";

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

  handleOutsideClick = e => {
    let isInside = this.node.contains(e.target);
    if (!isInside && this.state.isDropdownActive) {
      this.setState({ isDropdownActive: false });
    }
    // if () {
    //   alert("hi");
    // }
    // alert("ji");
    // this.state = {
    //   isDropdownActive: false
    // };
  };

  componentWillMount() {
    document.addEventListener("mousedown", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick, false);
  }

  render() {
    const { isDropdownActive } = this.state;
    const { isAuthenticated } = this.props;
    let renderUserMenu = (
      <div className="user-menu" ref={node => (this.node = node)}>
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
              <Icon name="add-white" size={24} /> <span>ADD NEW</span>
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
