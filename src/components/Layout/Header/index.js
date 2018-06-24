import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavItem as BootstrapNavItem,
  NavLink as BootstrapNavLink
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import Headroom from 'react-headroom';

import logo from '@/media/images/logo/logo.svg';
import Auth from '@/views/Auth';

import './style.scss';

class Header extends Component {
  render() {
    const links = [
      { name: 'dGame', to: '/dgame' },
      { name: 'DEX', to: '/dex' }
    ];

    const NavItem = props => (
      <BootstrapNavItem className="px-3">
        <BootstrapNavLink tag={NavLink} to={props.to}>
          {props.children}
        </BootstrapNavLink>
      </BootstrapNavItem>
    );

    const NavItems = () => (
      <Nav navbar>
        {links.map(link => (
          <NavItem key={link.to} to={link.to}>
            {link.name}
          </NavItem>
        ))}
        <Auth
          renderLoggedIn={user => (
            <NavItem to="/">Welcome {user.account}!</NavItem>
          )}
        />
      </Nav>
    );

    return (
      <header className="header">
        <Headroom>
          <Navbar className="container" expand light>
            <NavbarBrand tag={Link} to="/">
              <img className="logo" src={logo} alt="logo" />
            </NavbarBrand>
            <NavItems />
          </Navbar>
        </Headroom>
      </header>
    );
  }
}

export default Header;
