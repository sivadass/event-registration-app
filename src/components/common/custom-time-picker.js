import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

class CustomTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: moment(this.props.initialValue)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState(
      {
        dateValue: date
      },
      () => {
        this.props.onChange(this.props.id, this.state.dateValue);
      }
    );
  }

  handleBlur = () => {
    this.props.onBlur(this.props.id, true);
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor="tags">{this.props.label}</label>
        <DatePicker
          selected={this.state.dateValue}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          minDate={moment()}
          showTimeSelect
          dateFormat="LLL"
          className="custom-date-picker"
          placeholderText="Please select date"
        />
        {!!this.props.error &&
          this.props.touched && (
            <div className="input-feedback">{this.props.error}</div>
          )}
      </div>
    );
  }
}

export default CustomTimePicker;
