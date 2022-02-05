import React from 'react';
import Select from 'react-select';
import './custom-select.scss';

const CustomSelext = ({ sortTypes, defaultValue, handleSortChange }) => {
  return (
    <Select
      options={sortTypes}
      defaultValue={defaultValue}
      className="custom-select"
      classNamePrefix="custom-select"
      onChange={handleSortChange}
    ></Select>
  );
};

export default CustomSelext;
