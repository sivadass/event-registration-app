import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addUser } from "../../actions/users";
import uuid from "uuid/v4";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="container authentication">
        <div className="wrapper">
          <h1>Sign Up</h1>
          {this.props.successMessage && (
            <div className="alert alert-success">
              {this.props.successMessage}
            </div>
          )}
          {this.props.errorMessage && (
            <div className="alert alert-danger">{this.props.errorMessage}</div>
          )}
          <Formik
            initialValues={{ email: "", fullName: "", password: "" }}
            validationSchema={Yup.object().shape({
              fullName: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(40, "Maximum 40 characters only")
                .required("Full name is required"),
              email: Yup.string()
                .email()
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password is required")
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                let userData = {
                  userID: uuid(),
                  fullName: values.fullName,
                  email: values.email,
                  password: values.password
                };
                this.props.addUser(userData);
                actions.setSubmitting(false);
                actions.resetForm();
              }, 1000);
            }}
          >
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                isValid,
                handleSubmit,
                handleReset
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      id="fullName"
                      placeholder="Full Name"
                      type="text"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.fullName && touched.fullName
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.fullName &&
                      touched.fullName && (
                        <div className="input-feedback">{errors.fullName}</div>
                      )}
                  </div>
                  <div className="form-group">
                    <input
                      id="email"
                      placeholder="Email Address"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.email &&
                      touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                  </div>
                  <div className="form-group">
                    <input
                      id="password"
                      placeholder="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.password &&
                      touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                  </div>
                  <button
                    className="button primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader size={24} inverted={true} />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <Link to="/login" className="button button-link muted">
                    &larr; Go back to Login
                  </Link>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, auth }) => ({
  users: users.users,
  isAuthenticated: auth.isAuthenticated,
  isLoading: users.isLoading,
  successMessage: users.successMessage,
  errorMessage: users.errorMessage
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addUser }, dispatch);
}

Register.ProtoTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
