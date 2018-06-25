import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { transactionAPI } from '@/services/api';

import { request, pending, fulfilled, rejected } from '@/utils/store/request';

const form = {
  quantity: '',
  symbol: 'GXQ',
  to: ''
};

@observer
class TransferForm extends Component {
  @observable transferRequest = { ...request };

  @observable
  transferResult = {
    id: ''
  };

  @observable
  transferForm = {
    ...form
  };

  @action
  handleChange(e, type) {
    this.transferForm[type] = e.target.value;
  }

  @action
  async handleTransfer(e) {
    e.preventDefault();

    const { symbol, quantity, to } = this.transferForm;

    this.transferRequest = { ...pending };

    try {
      const { transaction } = await transactionAPI.new({
        symbol,
        quantity,
        to
      });

      runInAction(() => {
        this.transferResult = {
          id: transaction.transactionId
        };

        this.transferRequest = { ...fulfilled };
      });
    } catch ({ message }) {
      runInAction(() => {
        this.transferRequest = {
          ...rejected,
          error: message
        };
      });
    } finally {
      runInAction(() => {
        this.transferForm = { ...form };
      });
    }
  }

  render() {
    const { fetching, fetched, error } = this.transferRequest;
    const { quantity, symbol, to } = this.transferForm;
    const { id } = this.transferResult;

    return (
      <div>
        {!fetching &&
          fetched && (
            <Alert color="success">
              <h5>Transfer succeed</h5>
              <Link to={id}>View transaction #{id}</Link>
            </Alert>
          )}

        {!fetching &&
          error && (
            <Alert color="danger">
              <h5>Transfer failed</h5>
              {error}
            </Alert>
          )}

        <Form className="transfer" onSubmit={e => this.handleTransfer(e)}>
          <FormGroup>
            <Label>Send</Label>
            <Input
              type="number"
              placeholder="amount"
              autoComplete="off"
              value={quantity}
              onChange={e => this.handleChange(e, 'quantity')}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>of</Label>
            <Input
              type="select"
              value={symbol}
              onChange={e => this.handleChange(e, 'symbol')}
              required
            >
              {this.props.tokens.map(token => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>to</Label>
            <Input
              placeholder="account"
              autoComplete="account"
              value={to}
              onChange={e => this.handleChange(e, 'to')}
              required
            />
          </FormGroup>

          <Button color="primary" type="submit" disabled={fetching}>
            {fetching ? 'Transfer pending...' : 'Start transfer'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default TransferForm;
