import React, { useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Sorting from '../Sorting/Sorting';
import Filter from './../filter/Filter';
import './catalog.scss';
import product from './../../data.json';
import Pagintation from '../Pagination/Pagintation';

const Catalog = () => {
  let filters = {};
  const [products, stProduct] = useState(product);
  return (
    <div className="catalog container">
      <div className="catalog__filter">
        <Filter filters={filters}></Filter>
      </div>
      <div className="catalog__content">
        <div className="catalog__sorting">
          <Sorting />
        </div>
        <div className="catalog__choosed-filters">ви вибрали</div>
        <div className="catalog__items-wrapper">
          {products.map(item => {
            const { artnumber, ...rest } = item;
            return <ProductItem key={artnumber} {...rest}></ProductItem>;
          })}
        </div>
        <div className="catalog__pagination">
          <Pagintation />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
