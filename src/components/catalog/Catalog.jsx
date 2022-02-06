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
  const productOnPage = useRef(5);
  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    stock: [],
    weight: [],
  });
  const [sortBy, setSortBy] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageAmount = useRef(0);

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
    const amount = pageAmount.current;

    if (direction === 'prev') {
      if (currentPage >= 2) {
        setCurrentPage(currentPage - 1);
      }
    } else if (direction === 'next') {
      if (currentPage < amount) {
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

  const filteredProducts = useMemo(() => {
    return data.filter(getFilteredProducts(activeFilters));
  }, [activeFilters, data]);

  const paginationData = useMemo(() => {
    let data = {
      productsAmount: 0,
      pageAmount: 0,
      pageStartOffset: 0,
      pageEndOffset: 0,
    };

    if (isDataReady && filteredProducts.length > 0) {
      const productsAmount = filteredProducts.length;
      const pageAmount = Math.ceil(productsAmount / productOnPage.current);
      const pageStartOffset = (currentPage - 1) * productOnPage.current;
      const pageEndOffset = pageStartOffset + productOnPage.current;

      data.productsAmount = productsAmount;
      data.pageAmount = pageAmount;
      data.pageStartOffset = pageStartOffset;
      data.pageEndOffset = pageEndOffset;
    }
    pageAmount.current = data.pageAmount;

    return data;
  }, [currentPage, filteredProducts, productOnPage.current, isDataReady]);

  let portion = useMemo(() => {
    return (
      filteredProducts.slice(
        paginationData.pageStartOffset,
        paginationData.pageEndOffset
      ) || []
    );
  }, [paginationData, filteredProducts]);

  portion = useMemo(() => {
    return portion.sort(sortItemsBy(sortBy));
  }, [portion, sortBy]);

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

        <div className="catalog__items-wrapper items-wrapper">
          {portion.length === 0 ? (
            <span className="items-wrapper__empty">
              Нет продуктов подходящих под эти фильтры
            </span>
          ) : (
            portion.map(item => {
              const { artnumber, ...rest } = item;
              return <ProductItem key={artnumber} {...rest}></ProductItem>;
            })
          )}
        </div>
        <div className="catalog__pagination">
          <Pagintation
            isHidden={portion.length === 0}
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
