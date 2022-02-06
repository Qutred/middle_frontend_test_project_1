const sortByAsc = (item1, item2) => Number(item1.price) - Number(item2.price);

const sortByDesc = (item1, item2) => Number(item2.price) - Number(item1.price);

export const sortItemsBy = type => {
  if (type === 'desc') {
    return sortByDesc;
  } else if (type === 'asc') {
    return sortByAsc;
  }
};

export const getFilteredProducts = activeFilters => {
  let filterKeys = Object.keys(activeFilters);

  return function (product) {
    let result = filterKeys
      .map(filterType => {
        if (activeFilters[filterType].length === 0) {
          return true;
        } else {
          return activeFilters[filterType].includes(product[filterType]);
        }
      })
      .every(accaptable => accaptable);

    return result;
  };
};
