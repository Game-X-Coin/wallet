import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../../media/images/logo/logo.svg';
import './style.scss';

class Header extends Component {
  renderLinks(links) {
    return links.map(link => (
      <NavItem className="px-3" key={link.to}>
        <NavLink className="text-white" tag={Link} to={link.to}>
          {link.name}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    /* const links = [
      { name: 'dGame', to: '/dgame' },
      { name: 'DEX', to: '/dex' },
      { name: 'Login', to: '/login' }
    ]; */

    return (
      <header className="header">
        <Navbar className="container">
          <NavbarBrand tag={Link} to="/">
            <img className="logo" src={logo} alt="logo" />
          </NavbarBrand>
        </Navbar>
      </header>
    );
  }
}

export default Header;
