import React from 'react';
import CustomSelext from '../CustomSelect/CustomSelext';

const sortTypes = [
  { value: 'asc', label: 'Сначала дешевле' },
  { value: 'desc', label: 'Сначала дороже' },
];

const Sorting = () => {
  return (
    <div>
      <CustomSelext sortTypes={sortTypes}></CustomSelext>
    </div>
  );
};

export default Sorting;
