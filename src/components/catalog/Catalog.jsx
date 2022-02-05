import React, { useState, useRef, useMemo } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Sorting from '../Sorting/Sorting';
import Filter from './../filter/Filter';
import './catalog.scss';
import Pagintation from '../Pagination/Pagintation';
import BadgeWithClose from '../badge/BadgeWithClose';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';
import productsData from './../../data.json';

const Catalog = () => {
  const [isDataReady, setIsDataReady] = useState(false);
  const [data, setData] = useState([]);
  const [productQtyOnPage, setproductQtyOnPage] = useState(5);
  const [loading, setLoading] = useState({ loading: false, message: null });

  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    stock: [],
    weight: [],
  });

  useEffect(() => {
    const fakeAsyncCall = () => {
      setTimeout(() => {
        setIsDataReady(true);
        setData(productsData);
      }, 300);
    };

    fakeAsyncCall();
  }, []);

  const handleFilterChange = (filterType, filterValue) => {
    if (!activeFilters[filterType].includes(filterValue)) {
      setActiveFilters(prevState => {
        return {
          ...prevState,
          [filterType]: [...prevState[filterType], filterValue],
        };
      });
    } else {
      setActiveFilters(prevState => {
        return {
          ...prevState,
          [filterType]: [
            ...prevState[filterType].filter(item => item !== filterValue),
          ],
        };
      });
    }
  };

  const hasSomeActiveFilters = () => {
    debugger;
    let filterKeys = Object.keys(activeFilters);

    return filterKeys.some(key => activeFilters[key].length);
  };

  const computeProducts = () => {
    return data;
  };

  const renderFilters = useMemo(() => {
    const filterTypes = {
      brands: [],
      stock: [],
      weight: [],
    };

    if (isDataReady && data.length > 0) {
      data.forEach(dataItem => {
        let brand = dataItem.brand;
        let weight = dataItem.weight;
        let stock = dataItem.stock;

        if (!filterTypes.brands.includes(brand)) {
          filterTypes.brands.push(brand);
        }

        if (!filterTypes.weight.includes(weight)) {
          filterTypes.weight.push(weight);
        }

        if (!filterTypes.stock.includes(stock)) {
          filterTypes.stock.push(stock);
        }
      });
    }

    return filterTypes;
  }, [data, isDataReady]);

  const renderBadges = () => {
    return Object.keys(activeFilters).map((type, index) => {
      return (
        activeFilters[type].length > 0 &&
        activeFilters[type].map((item, index) => {
          return (
            <BadgeWithClose
              key={`${item}_${index}`}
              onClick={() => handleFilterChange(type, item)}
            >
              {type === 'stock'
                ? item === '1'
                  ? 'есть в наличии'
                  : 'нет в наличии'
                : item}
            </BadgeWithClose>
          );
        })
      );
    });
  };

  let computedProducts = computeProducts();

  if (!isDataReady) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="catalog container">
      <div className="catalog__filter">
        <Filter
          filters={renderFilters}
          activeFilters={activeFilters}
          onChange={handleFilterChange}
        ></Filter>
      </div>
      <div className="catalog__content">
        <div className="catalog__sorting">
          <Sorting />
        </div>
        {hasSomeActiveFilters() ? (
          <div className="catalog__choosed-filters choosed-filter">
            <span className="choosed-filter__title">ви вибрали:</span>
            {renderBadges()}
          </div>
        ) : null}

        <div className="catalog__items-wrapper">
          {computedProducts.map(item => {
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
