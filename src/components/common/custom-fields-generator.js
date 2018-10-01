import React from "react";
import Select from "react-select";

const options = [
  { value: "textField", label: "Text Field" },
  { value: "textArea", label: "Text Area" }
];

class CustomFieldsGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldLabel: "",
      fieldType: "textField",
      isMandatory: false
    };
  }

  handleInputChange = e => {
    this.setState({
      fieldLabel: e.target.value
    });
  };

  handleSelectChange = value => {
    this.setState({
      fieldType: value
    });
  };

  handleCheckboxChange = e => {
    const target = e.target;
    const value = target.checked;
    this.setState({
      isMandatory: value
    });
  };

  handleBlur = () => {};

  render() {
    return (
      <div className="form-group">
        <label htmlFor="tags">{this.props.label}</label>
        <div className="custom-field-group">
          <div className="custom-field-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Custom Field Label"
              onChange={this.handleInputChange}
            />
            <Select
              options={options}
              isMulti={false}
              onChange={this.handleSelectChange}
              onBlur={this.handleBlur}
              className="custom-select"
              classNamePrefix="react-select"
              placeholder="Type"
            />
          </div>
          <div className="custom-field-wrapper">
            <div className="custom-checkbox">
              <input
                id="isMandatory"
                name="isMandatory"
                type="checkbox"
                checked={this.state.isMandatory}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor="isMandatory">This is mandatory</label>
            </div>
            <button className="button remove-button">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomFieldsGenerator;
