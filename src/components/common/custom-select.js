import React from "react";
import Select from "react-select";

class CustomSelect extends React.Component {
  handleChange = value => {
    this.props.onChange(this.props.id, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.id, true);
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor="tags">{this.props.label}</label>
        <Select
          id={this.props.id}
          options={this.props.options}
          isMulti={this.props.isMulti}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          className="custom-select"
          classNamePrefix="react-select"
        />
        {!!this.props.error &&
          this.props.touched && (
            <div className="input-feedback">{this.props.error}</div>
          )}
      </div>
    );
  }
}

export default CustomSelect;
