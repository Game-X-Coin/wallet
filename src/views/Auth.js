// eslint-disable-next-line
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('authStore', 'userStore')
@observer
class Auth extends Component {
  render() {
    const {
      renderLoggedIn = () => null,
      renderLoggedOut = () => null,
      userStore,
      authStore
    } = this.props;

    const { currentUser } = userStore;
    const { logout } = authStore;

    return currentUser
      ? renderLoggedIn(currentUser, logout)
      : renderLoggedOut();
  }
}

export default Auth;
