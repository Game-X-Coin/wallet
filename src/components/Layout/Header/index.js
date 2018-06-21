import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';

import logo from '../../../media/images/logo/logo.svg';
import './style.scss';

class Header extends Component {
  renderLinks(links) {
    return links.map(link => (
      <NavItem className="px-3" key={link.to}>
        <NavLink tag={Link} to={link.to}>
          {link.name}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    const links = [
      { name: 'dGame', to: '/dgame' },
      { name: 'DEX', to: '/dex' },
      { name: 'Login', to: '/login' }
    ];

    return (
      <Headroom>
        <header className="header">
          <Navbar className="container" expand light>
            <NavbarBrand tag={Link} to="/">
              <img className="logo" src={logo} alt="logo" />
            </NavbarBrand>
            <Nav navbar>{this.renderLinks(links)}</Nav>
          </Navbar>
        </header>
      </Headroom>
    );
  }
}

export default Header;
