import React from "react";
import Loader from "../common/loader";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { addEvent } from "../../actions/events";
import uuid from "uuid/v4";
import { Link } from "react-router-dom";
import { locations, tags } from "../../utils/select-options";
import CustomSelect from "../common/custom-select";

class AddEvent extends React.Component {
  render() {
    console.log(this.props.userID);
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/login" className="back-button">
            &larr;
          </Link>
          Add Event
        </div>
        <div className="page-content">
          <Formik
            initialValues={{
              eventName: "",
              description: "",
              duration: "",
              location: "",
              fees: "",
              tags: [],
              maxAllowedParticipants: 0,
              customFields: [],
              userID: this.props.userID
            }}
            validationSchema={Yup.object().shape({
              eventName: Yup.string()
                .min(3, "Minimum 3 characters")
                .max(80, "Maximum 80 characters only")
                .required("Event name is required"),
              description: Yup.string()
                .min(20, "Minimum 20 characters")
                .required("Description is required"),
              duration: Yup.number()
                .integer("Only positive numbers")
                .min(1, "Minimum 1 hour")
                .required("Duration is required"),
              location: Yup.string().required("Loaction is required"),
              fees: Yup.number()
                .positive()
                .integer(),
              tags: Yup.array()
                .min(3, "Pick at least 3 tags")
                .of(
                  Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required()
                  })
                ),
              maxAllowedParticipants: Yup.number()
                .required("Maximum allowed participants is required")
                .positive()
                .integer(),
              customFields: Yup.array().of(Yup.object())
            })}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                let eventData = {
                  eventID: uuid(),
                  eventCreator: values.userID,
                  eventName: values.eventName,
                  eventDescription: values.description,
                  eventDuration: values.duration,
                  eventLocation: values.location,
                  eventTags: values.tags
                };
                this.props.addEvent(eventData);
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
                handleReset,
                setFieldValue,
                setFieldTouched
              } = props;
              return (
                <form onSubmit={handleSubmit} className="add-event-form">
                  <div className="form-group">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                      id="eventName"
                      placeholder="Some Cool Event in Chennai"
                      type="text"
                      value={values.eventName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.eventName && touched.eventName
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.eventName &&
                      touched.eventName && (
                        <div className="input-feedback">{errors.eventName}</div>
                      )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      placeholder="Tell more about the event"
                      type="text"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.description &&
                      touched.description && (
                        <div className="input-feedback">
                          {errors.description}
                        </div>
                      )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Duration (in hours)</label>
                    <input
                      id="duration"
                      placeholder="Eg: 1"
                      type="text"
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.duration && touched.duration
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.duration &&
                      touched.duration && (
                        <div className="input-feedback">{errors.duration}</div>
                      )}
                  </div>

                  <CustomSelect
                    id="location"
                    label="Location"
                    isMulti={false}
                    options={locations}
                    value={values.location}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.location}
                    touched={touched.location}
                  />

                  <CustomSelect
                    id="tags"
                    label="Tags (select at least 3) "
                    isMulti={true}
                    options={tags}
                    value={values.tags}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.tags}
                    touched={touched.tags}
                  />

                  <button
                    className="button primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader size={24} inverted={true} />
                    ) : (
                      "ADD EVENT"
                    )}
                  </button>
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
  userID: auth.user.userID
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addEvent }, dispatch);
}

AddEvent.ProtoTypes = {
  auth: PropTypes.object,
  addEvent: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
