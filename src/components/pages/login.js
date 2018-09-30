import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import { Formik } from "formik";
import * as Yup from "yup";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container authentication">
        <div className="wrapper">
          <h1>Sign In</h1>
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
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 100000);
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
                    {isSubmitting ? (
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

export default Login;
