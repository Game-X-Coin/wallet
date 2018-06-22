import React from 'react';

import './style.scss';

const Header = props => {
  return (
    <div
      className="page-header"
      style={{
        backgroundImage: `url(${props.image})`
      }}
    >
      <div className="container">{props.children}</div>
    </div>
  );
};

const Body = props => {
  return (
    <div className="page-body">
      <div className="container">{props.children}</div>
    </div>
  );
};

export default {
  Header,
  Body
};
