import React from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import './filter.scss';

const Filter = ({ filters, activeFilters, onChange }) => {
  let filterKeys = Object.keys(filters);

  const onFilterChange = (key, value) => {
    return e => {
      onChange(key, value);
    };
  };

  return (
    <div className="filter">
      <div className="filter__overlay"></div>
      <span className="filter__close-btn">x</span>
      <div className="filter__content">
        {filterKeys.length > 0 &&
          filterKeys.map((filterKey, index) => {
            const title =
              filterKey === 'brands'
                ? 'Бренд '
                : filterKey === 'stock'
                ? 'Наличие в магазине'
                : filterKey === 'weight'
                ? 'вес '
                : 'фасовка';
            const key = filterKey;
            return (
              <div
                className="filter__group"
                key={filters[filterKey].title + '_' + index}
              >
                <div className="filter__title">{title}</div>
                <ul className="filter__items-wrap">
                  {filters[filterKey].map(value => {
                    return (
                      <li className="filter__item" key={value}>
                        {filterKey === 'stock' ? (
                          <CustomCheckbox
                            key={value}
                            id={value}
                            name={value}
                            isChecked={activeFilters[filterKey].includes(value)}
                            handleChange={onFilterChange(key, value)}
                          >
                            {value === '0' ? 'Нет в наличии' : 'Есть в наличии'}
                          </CustomCheckbox>
                        ) : (
                          <CustomCheckbox
                            isChecked={activeFilters[filterKey].includes(value)}
                            name={value}
                            id={value}
                            key={value}
                            handleChange={onFilterChange(key, value)}
                          >
                            {value}
                          </CustomCheckbox>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
