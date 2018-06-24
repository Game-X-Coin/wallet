import { action, observable } from 'mobx';

import userStore from './userStore';
import commonStore from './commonStore';

import { authAPI } from '@/services/api';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable redirectParams = {};
  @observable
  temp = {
    keys: {
      owner: { private: null, public: null },
      active: { private: null, public: null }
    },
    ownerWalletPassword: '',
    activeWalletPassword: ''
  };

  @action
  setTempValues(keys, ownerWalletPassword, activeWalletPassword) {
    this.temp = {
      keys,
      ownerWalletPassword,
      activeWalletPassword
    };
  }

  @action
  login({ email, password }) {
    this.inProgress = true;
    this.errors = undefined;

    return authAPI
      .login({ email, password })
      .then(({ token }) => commonStore.setToken(token.accessToken))
      .then(() => userStore.pullUser())
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action
  logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();

    return Promise.resolve();
  }

  @action
  register({ email, account, password }) {
    this.inProgress = true;

    return authAPI
      .register({
        email,
        account,
        password
      })
      .then(({ token, keys, ownerWalletPassword, activeWalletPassword }) => {
        commonStore.setToken(token.accessToken);
        this.setTempValues(keys, ownerWalletPassword, activeWalletPassword);
      })
      .then(() => userStore.pullUser())
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }
}

export default new AuthStore();
