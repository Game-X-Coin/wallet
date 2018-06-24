import { observable, action } from 'mobx';
import { eosAPI } from '@/services/api';

export class BalanceStore {
  @observable isLoading = false;
  @observable
  balances = {
    GXQ: '0.0000'
  };

  $req(account) {
    return eosAPI.balances(account);
  }

  @action
  loadBalances(account) {
    this.isLoading = true;

    return this.$req(account)
      .then(
        action(({ balances }) => {
          this.balances = {
            ...this.balances,
            ...balances
          };
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }
}

export default new BalanceStore();
