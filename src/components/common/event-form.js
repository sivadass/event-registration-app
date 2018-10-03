import React from "react";
import Loader from "./loader";
import { Formik } from "formik";
import * as Yup from "yup";
import { locations, tags } from "../../utils/select-options";
import CustomSelect from "./custom-select";
import CustomTimePicker from "./custom-time-picker";
import CustomFieldsGenerator from "./custom-fields-generator";
import moment from "moment";

class EventForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          eventID: this.props.initialValues.eventID,
          eventName: this.props.initialValues.eventName,
          description: this.props.initialValues.eventDescription,
          duration: this.props.initialValues.eventDuration,
          location: this.props.initialValues.eventLocation,
          fees: this.props.initialValues.eventFees,
          tags: this.props.initialValues.eventTags,
          date: moment(this.props.initialValues.eventDate).format(),
          maxAllowedParticipants: this.props.initialValues
            .eventMaxAllowedParticipants,
          customFields: this.props.initialValues.eventCustomFields,
          userID: this.props.initialValues.eventCreator
        }}
        validationSchema={Yup.object().shape({
          eventName: Yup.string()
            .min(3, "Minimum 3 characters")
            .max(80, "Maximum 80 characters only")
            .required("Event name is required"),
          description: Yup.string()
            .min(20, "Minimum 20 characters")
            .required("Description is required"),
          duration: Yup.string()
            .matches(/(^[0-9]+$)/, "Enter only digits here")
            .required("Duration is required")
            .max(2, "Maximum 99 hours"),
          location: Yup.string().required("Loaction is required"),
          fees: Yup.string()
            .matches(/(^[0-9]+$)/, "Enter only digits here")
            .required("Fees is required")
            .max(5, "Maximum 5 digits only"),
          tags: Yup.array()
            .min(1, "Pick at least 1 tag")
            .of(
              Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required()
              })
            ),
          date: Yup.string().required("Please select the date of the event"),
          maxAllowedParticipants: Yup.string()
            .matches(/(^[0-9]+$)/, "Enter only digits here")
            .required("Maximum allowed partcipant is required")
            .max(5, "Maximum 5 digits only"),
          customFields: Yup.array().of(Yup.object())
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            let eventData = {
              eventID: values.eventID,
              eventCreator: values.userID,
              eventName: values.eventName,
              eventDescription: values.description,
              eventDuration: values.duration,
              eventLocation: values.location,
              eventTags: values.tags,
              eventDate: moment(values.date).format(),
              eventFees: values.fees,
              eventMaxAllowedParticipants: values.maxAllowedParticipants
            };
            this.props.submitEventForm(eventData);
            actions.setSubmitting(false);
            actions.resetForm();
            if (this.props.isEditing) {
              this.props.handleEventUpdate();
            }
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
              <div className="row">
                <div className="col-12">
                  <h4>Event Details</h4>
                </div>
              </div>
              <div className="row" style={{ marginBottom: 24 }}>
                <div className="col-6">
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
                  <CustomTimePicker
                    id="date"
                    label="Day of the event"
                    initialValue={values.date}
                    value={values.date}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.date}
                    touched={touched.date}
                  />

                  <div className="form-group">
                    <label htmlFor="duration">Duration (in hours)</label>
                    <input
                      id="duration"
                      placeholder="Enter duration"
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
                </div>
                <div className="col-6">
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
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h4>Event Pricing</h4>
                </div>
              </div>
              <div className="row" style={{ marginBottom: 24 }}>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="fees">Fees (in Dollars)</label>
                    <input
                      id="fees"
                      placeholder="Enter amount"
                      type="text"
                      value={values.fees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.fees && touched.fees
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.fees &&
                      touched.fees && (
                        <div className="input-feedback">{errors.fees}</div>
                      )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="maxAllowedParticipants">
                      Maximum Allowed Participants
                    </label>
                    <input
                      id="maxAllowedParticipants"
                      placeholder="Enter maximum allowed participants"
                      type="text"
                      value={values.maxAllowedParticipants}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.maxAllowedParticipants &&
                        touched.maxAllowedParticipants
                          ? "form-control error"
                          : "form-control"
                      }
                    />
                    {errors.maxAllowedParticipants &&
                      touched.maxAllowedParticipants && (
                        <div className="input-feedback">
                          {errors.maxAllowedParticipants}
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <h4>Additional Information</h4>
                </div>
              </div>

              <div className="row" style={{ marginBottom: 24 }}>
                <div className="col-6">
                  <CustomFieldsGenerator label="Custom Fields" />
                </div>
                <div className="col-6">
                  <CustomSelect
                    id="tags"
                    label="Tags (select at least 1) "
                    isMulti={true}
                    options={tags}
                    value={values.tags}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.tags}
                    touched={touched.tags}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6" />
                <div className="col-6">
                  <button
                    className="button primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ maxWidth: 240, float: "right" }}
                  >
                    {isSubmitting ? (
                      <Loader size={24} inverted={true} />
                    ) : this.props.isEditing ? (
                      "UPDATE EVENT"
                    ) : (
                      "ADD EVENT"
                    )}
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default EventForm;
