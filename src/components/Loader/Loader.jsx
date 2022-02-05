import React from 'react';
import spinner from './../../assets/img/icons/load-spin.svg';
import './loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner-wrapper">
        <img className="loader__spinner" src={spinner} alt="spinner" />
      </div>
    </div>
  );
};

export default Loader;
