import React from 'react';
import './custom-checkbox.scss';

const CustomCheckbox = ({
  id,
  name,
  isChecked,
  handleChange,
  labelLeft,
  children,
}) => {
  return (
    <label htmlFor={id} className="custom-checkbox">
      {labelLeft ? (
        <span className="custom-checkbox__label-txt">{children}</span>
      ) : null}
      <input
        name={name}
        checked={isChecked}
        type="checkbox"
        id={id}
        onChange={handleChange}
        className="custom-checkbox__input"
      />
      <span className="custom-checkbox__mark"></span>
      {labelLeft ? null : (
        <span className="custom-checkbox__label-txt">{children}</span>
      )}
    </label>
  );
};

export default CustomCheckbox;
