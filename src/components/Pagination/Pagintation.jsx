import React from 'react';
import './pagination.scss';

const Pagintation = ({ from, to, handlePaginationClick }) => {
  const handleBtnClick = type => {
    return e => {
      handlePaginationClick(type);
    };
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button_prev"
        onClick={handleBtnClick('prev')}
      >
        Предыдущая страница
      </button>
      <div className="pagination__list">
        <span>{from}</span>из<span>{to}</span>
      </div>
      <button
        className="pagination__button pagination__button_next"
        onClick={handleBtnClick('next')}
      >
        Следующая страница
      </button>
    </div>
  );
};

export default Pagintation;
