import { observable, action } from 'mobx';
import { authAPI } from '@/services/api';

class UserStore {
  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action
  pullUser() {
    this.loadingUser = true;

    return authAPI
      .current()
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  @action
  updateUser(newUser) {
    this.updatingUser = true;

    return authAPI
      .save(newUser)
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  @action
  forgetUser() {
    this.currentUser = undefined;
  }
}

export default new UserStore();
