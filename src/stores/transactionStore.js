import { observable, action } from 'mobx';
import { transactionAPI } from '@/services/api';

const LIMIT = 10;

export class TransactionStore {
  @observable isLoading = false;
  @observable page = 0;
  @observable totalPagesCount = 0;
  @observable transactions = observable([]);
  @observable predicate = {};

  $req() {
    return transactionAPI.all(this.page, LIMIT, this.predicate);
  }

  @action
  loadTransactions() {
    this.isLoading = true;

    return this.$req()
      .then(
        action(({ transactions, transactionsCount }) => {
          this.transactions = observable(transactions);
          this.totalPagesCount = Math.ceil(transactionsCount / LIMIT);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  @action
  load(id) {
    transactionAPI.load(id).then(
      action(({ transaction }) => {
        this.transactions = [transaction];
      })
    );
  }

  @action
  async createTransaction() {
    this.isLoading = true;

    await transactionAPI.createTransaction();
  }
}

export default new TransactionStore();
