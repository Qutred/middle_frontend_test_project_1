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
import { sortItemsBy, getFilteredProducts } from './helpers';

const Catalog = () => {
  const [isDataReady, setIsDataReady] = useState(false);
  const [data, setData] = useState([]);
  const [productOnPage, setProductOnPage] = useState(5);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    stock: [],
    weight: [],
  });

  const [sortBy, setSortBy] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);

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
      setCurrentPage(1);
    } else {
      setActiveFilters(prevState => {
        return {
          ...prevState,
          [filterType]: [
            ...prevState[filterType].filter(item => item !== filterValue),
          ],
        };
      });
      setCurrentPage(1);
    }
  };

  const handleSortChange = activeSortType => {
    setSortBy(activeSortType.value);
  };

  const handlePaginationClick = direction => {
    const productsAmount = data.length;
    const pageAmount = Math.ceil(productsAmount / productOnPage);

    if (direction === 'prev') {
      if (currentPage >= 2) {
        setCurrentPage(currentPage - 1);
      }
    } else if (direction === 'next') {
      if (currentPage < pageAmount) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const hasSomeActiveFilters = () => {
    let filterKeys = Object.keys(activeFilters);

    return filterKeys.some(filter => {
      return activeFilters[filter].length;
    });
  };

  const renderFilters = useMemo(() => {
    const filterTypes = {
      brand: [],
      stock: [],
      weight: [],
    };

    if (isDataReady && data.length > 0) {
      data.forEach(dataItem => {
        let brand = dataItem.brand;
        let weight = dataItem.weight;
        let stock = dataItem.stock;

        if (!filterTypes.brand.includes(brand)) {
          filterTypes.brand.push(brand);
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
    return Object.keys(activeFilters).map(type => {
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

  const getProductsSlice = (paginationData, portion) => {
    return (
      portion.slice(
        paginationData.pageStartOffset,
        paginationData.pageEndOffset
      ) || []
    );
  };

  const getPaginationData = portion => {
    if (isDataReady && portion.length > 0) {
      const productsAmount = portion.length;
      const pageAmount = Math.ceil(productsAmount / productOnPage);
      const pageStartOffset = (currentPage - 1) * productOnPage;
      const pageEndOffset = pageStartOffset + productOnPage;

      return { productsAmount, pageAmount, pageStartOffset, pageEndOffset };
    }

    return {
      productsAmount: 0,
      pageAmount: 0,
      pageStartOffset: 0,
      pageEndOffset: 0,
    };
  };
  let portion = data;
  portion = portion.filter(getFilteredProducts(activeFilters));
  portion = portion.sort(sortItemsBy(sortBy));
  let paginationData = getPaginationData(portion);
  portion = getProductsSlice(paginationData, portion);

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
          <Sorting sortBy={sortBy} handleSortChange={handleSortChange} />
        </div>
        {hasSomeActiveFilters() ? (
          <div className="catalog__choosed-filters choosed-filter">
            <span className="choosed-filter__title">ви вибрали:</span>
            {renderBadges()}
          </div>
        ) : null}

        <div className="catalog__items-wrapper">
          {portion.map(item => {
            const { artnumber, ...rest } = item;
            return <ProductItem key={artnumber} {...rest}></ProductItem>;
          })}
        </div>
        <div className="catalog__pagination">
          <Pagintation
            from={currentPage}
            to={paginationData.pageAmount}
            handlePaginationClick={handlePaginationClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
