const sortByAsc = (item1, item2) => Number(item1.price) - Number(item2.price);

const sortByDesc = (item1, item2) => Number(item2.price) - Number(item1.price);

export const sortItemsBy = type => {
  if (type === 'desc') {
    return sortByDesc;
  } else if (type === 'asc') {
    return sortByAsc;
  }
};
