import React from 'react';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import './filter.scss';

const Filter = () => {
  return (
    <div className="filter">
      <div className="filter__overlay"></div>
      <span className="filter__close-btn">x</span>
      <div className="filter__content">
        <div className="filter__group">
          <div className="filter__title">Обем</div>
          <ul className="filter__items-wrap">
            <li className="filter__item">
              <CustomCheckbox>1</CustomCheckbox>
            </li>
            <li className="filter__item">
              <CustomCheckbox>2</CustomCheckbox>
            </li>
            <li className="filter__item">
              <CustomCheckbox>3</CustomCheckbox>
            </li>
          </ul>
        </div>
        <div className="filter__group">
          <div className="filter__title">Обем</div>
          <ul className="filter__items-wrap">
            <li className="filter__item">
              <CustomCheckbox>1</CustomCheckbox>
            </li>
            <li className="filter__item">
              <CustomCheckbox>2</CustomCheckbox>
            </li>
            <li className="filter__item">
              <CustomCheckbox>3</CustomCheckbox>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filter;
