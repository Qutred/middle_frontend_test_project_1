import React from 'react';
import './pagination.scss';

const Pagintation = ({ from, to, handlePaginationClick, isHidden }) => {
  const handleBtnClick = type => {
    return e => {
      handlePaginationClick(type);
    };
  };

  return isHidden ? null : (
    <div className="pagination">
      <button
        className="pagination__button pagination__button_prev"
        disabled={from < 2}
        onClick={handleBtnClick('prev')}
      >
        Предыдущая страница
      </button>
      <div className="pagination__list">
        <span>{from}</span>из<span>{to}</span>
      </div>
      <button
        className="pagination__button pagination__button_next"
        disabled={from === to}
        onClick={handleBtnClick('next')}
      >
        Следующая страница
      </button>
    </div>
  );
};

export default Pagintation;
