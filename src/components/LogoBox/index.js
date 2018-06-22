import React from 'react';

import logo from '@/media/images/logo/logo.svg';
import './style.scss';

const LogoBox = () => {
  return (
    <div className="logo-box">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default LogoBox;
