import { action, observable } from 'mobx';

import userStore from './userStore';
import commonStore from './commonStore';

import { authAPI } from '@/services/api';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable redirectParams = {};
  @observable
  values = {
    account: '',
    email: '',
    password: '',
    keys: {
      owner: { private: null, public: null },
      active: { private: null, public: null }
    },
    ownerWalletPassword: '',
    activeWalletPassword: ''
  };

  @action
  setAccount(account) {
    this.values.account = account;
  }

  @action
  setEmail(email) {
    this.values.email = email;
  }

  @action
  setPassword(password) {
    this.values.password = password;
  }

  @action
  setTempValues(keys, ownerWalletPassword, activeWalletPassword) {
    this.values.keys = keys;
    this.values.ownerWalletPassword = ownerWalletPassword;
    this.values.activeWalletPassword = activeWalletPassword;
  }

  @action
  reset() {
    this.values.account = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action
  login() {
    this.inProgress = true;
    this.errors = undefined;

    return authAPI
      .login(this.values.email, this.values.password)
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
  register() {
    this.inProgress = true;

    return authAPI
      .register({
        account: this.values.account,
        email: this.values.email,
        password: this.values.password
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
