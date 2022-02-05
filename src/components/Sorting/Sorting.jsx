import React from 'react';
import CustomSelext from '../CustomSelect/CustomSelext';

const sortTypes = [
  { value: 'asc', label: 'Сначала дешевле' },
  { value: 'desc', label: 'Сначала дороже' },
];

const Sorting = ({ sortBy, handleSortChange }) => {
  const activeSortType = sortTypes.find(item => item.value === sortBy);

  return (
    <div>
      <CustomSelext
        sortTypes={sortTypes}
        defaultValue={activeSortType}
        handleSortChange={handleSortChange}
      ></CustomSelext>
    </div>
  );
};

export default Sorting;
