import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth";

class Login extends React.Component {
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
          <h1>Sign In</h1>
          {this.props.errorMessage && (
            <div className="alert alert-danger">{this.props.errorMessage}</div>
          )}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Username should be a valid email")
                .required("Email is required"),
              password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password is required")
            })}
            onSubmit={(values, actions) => {
              this.props.loginUser(values);
              setTimeout(() => {
                actions.setSubmitting(false);
                actions.resetForm();
              }, 3000);
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
                    {this.props.isLoading ? (
                      <Loader size={24} inverted={true} />
                    ) : (
                      "Login"
                    )}
                  </button>
                  <span className="sub-text">New User?</span>
                  <Link to="/register" className="button button-link">
                    Register here
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

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  isLoading: auth.isLoading,
  errorMessage: auth.errorMessage
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

Login.ProtoTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
