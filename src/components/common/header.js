import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";

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
  render() {
    const { isDropdownActive } = this.state;
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Madras Meetups" />
            </Link>
          </div>

          <div className="user-menu">
            <a href="#" className="trigger" onClick={this.toggleDropdown}>
              <img src={avatar} alt="Avatar" /> <span>John Doe</span>
            </a>
            <div className={isDropdownActive ? "dropdown active" : "dropdown"}>
              <ul>
                <li>
                  <a>Profile</a>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
