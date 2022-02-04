import React from 'react';
import './pagination.scss';

const Pagintation = () => {
  return (
    <div className="pagination">
      <button className="pagination__button pagination__button_prev">
        Предыдущая страница
      </button>
      <div className="pagination__list">
        <span>1</span>из <span>10</span>
      </div>
      <button className="pagination__button pagination__button_next">
        Следующая страница
      </button>
    </div>
  );
};

export default Pagintation;
