import React from 'react';

import './style.scss';

const Fullscreen = ({ className, children, onClose }) => {
  return (
    <div className="fullscreen">
      {onClose && (
        <div className="fullscreen__close" onClick={onClose}>
          <i className="material-icons">close</i>
          EXIT
        </div>
      )}
      <div className="fullscreen-content">
        <div className={className}>{children}</div>
      </div>
      <div className="fullscreen__description">
        GXC Wallet Ⓒ 2018 GXC World Pte Ltd
      </div>
    </div>
  );
};

export default Fullscreen;
