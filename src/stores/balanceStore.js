import { observable, action } from 'mobx';
import { eosAPI } from '@/services/api';

export class BalanceStore {
  @observable isLoading = false;
  @observable
  data = {
    GXQ: '0',
    BLS: '0.000',
    SPN: '0.000',
    ACA: '0.000'
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
          this.data = { ...this.data, ...balances };
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
