import { observable, action } from 'mobx';
import { walletAPI } from '@/services/api';

const LIMIT = 10;

export class WalletStore {
  @observable isLoading = false;
  @observable page = 0;
  @observable totalPagesCount = 0;
  @observable wallets = observable([]);
  @observable predicate = {};

  $req() {
    return walletAPI.all(this.page, LIMIT, this.predicate);
  }

  @action
  loadWallets() {
    this.isLoading = true;

    return this.$req()
      .then(
        action(({ wallets, walletsCount }) => {
          this.wallets = wallets;
          this.totalPagesCount = Math.ceil(walletsCount / LIMIT);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  @action
  async createWallet() {
    this.isLoading = true;

    await walletAPI.createWallet();
  }
}

export default new WalletStore();
