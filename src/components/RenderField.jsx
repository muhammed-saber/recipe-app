import React from 'react';

export default class RenderField extends React.Component {
  render() {
    const { input, label, type, meta: { touched, error }, multiRow, placeholder } = this.props;

    return (
      <div>
        <label>{label}</label>
        <div>
          {
            multiRow &&
              <textarea
                className="form-control"
                {...input}
                type={type}
                rows="5"
                placeholder={placeholder}
              /> ||
              <input
                className="form-control"
                {...input}
                type={type}
                placeholder={placeholder}
              />
          }
          {touched && error && <span className="text-danger">{error}</span>}
        </div>
      </div>
    );
  }
}
