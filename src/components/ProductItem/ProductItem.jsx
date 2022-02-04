import React from 'react';
import './product-item.scss';

const ProductItem = ({ name, brand, weight, quantity, price, stock }) => {
  return (
    <div className="product-item">
      <div className="product-item__info-row">
        <span>Название:</span>
        {name}
      </div>
      <div className="product-item__info-row">
        <span>Бренд:</span>
        {brand}
      </div>
      <div className="product-item__info-row">
        <span>Вес:</span>
        {weight}
      </div>
      <div className="product-item__info-row">
        <span>Фасовка:</span>
        {quantity}
      </div>
      <div className="product-item__info-row">{price}грн</div>
      <div className="product-item__info-row">
        {Number(stock) === 1 ? 'Есть на складе' : 'Нету на складе'}
      </div>
    </div>
  );
};

export default ProductItem;
