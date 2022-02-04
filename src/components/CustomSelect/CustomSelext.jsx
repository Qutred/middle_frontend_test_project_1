import React from 'react';
import Select from 'react-select';
import './custom-select.scss';

const CustomSelext = ({ sortTypes }) => {
  return (
    <Select
      options={sortTypes}
      defaultValue={sortTypes[0]}
      className="custom-select"
      classNamePrefix="custom-select"
    ></Select>
  );
};

export default CustomSelext;
