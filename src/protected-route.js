import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
});

ProtectedRoute.ProtoTypes = {
  auth: PropTypes.object
};

export default connect(
  mapStateToProps,
  null
)(ProtectedRoute);
