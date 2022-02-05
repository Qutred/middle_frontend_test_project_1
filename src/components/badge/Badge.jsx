import React from 'react';
import classname from 'classnames';
import './badge.scss';

const Badge = ({ children, classNames, onClick }) => {
  return (
    <div className={classname('badge', classNames)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Badge;
