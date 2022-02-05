import React from 'react';
import classname from 'classnames';
import './badge.scss';

const BadgeWithClose = ({ children, classNames, onClick }) => {
  return (
    <div className={classname('badge badge_with-close', classNames)}>
      {children}
      <span className="badge_with-close__close-btn" onClick={onClick}>
        {' '}
        &#x2715;
      </span>
    </div>
  );
};

export default BadgeWithClose;
