// eslint-disable-next-line
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@withRouter
@inject('authStore', 'userStore')
@observer
class Auth extends Component {
  render() {
    const {
      renderLoggedIn = () => null,
      renderLoggedOut = () => null,
      userStore: { currentUser },
      authStore: { logout }
    } = this.props;

    return currentUser
      ? renderLoggedIn(currentUser, logout)
      : renderLoggedOut();
  }
}

export default Auth;
