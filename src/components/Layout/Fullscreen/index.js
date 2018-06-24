import React from 'react';

import './style.scss';

const Fullscreen = props => {
  return (
    <div className="fullscreen">
      <div className="fullscreen-content">
        <div className={props.className}>{props.children}</div>
      </div>
      <div className="fullscreen__description">
        GXC Wallet Ⓒ 2018 GXC World Pte Ltd
      </div>
    </div>
  );
};

export default Fullscreen;
