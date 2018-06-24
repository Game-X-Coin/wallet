// eslint-disable-next-line
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('authStore', 'userStore')
@observer
class Auth extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.authStore
      .logout()
      .then(() => this.props.history.replace('/login'));
  }

  render() {
    const {
      renderLoggedIn = () => null,
      renderLoggedOut = () => null,
      userStore
    } = this.props;

    const { currentUser } = userStore;

    return currentUser
      ? renderLoggedIn(currentUser, this.handleLogout)
      : renderLoggedOut();
  }
}

export default Auth;
