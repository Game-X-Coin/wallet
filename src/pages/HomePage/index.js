import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { Page } from '@/components/Layout';

import { tokens } from '@/constants/dgame';

import TransferForm from './TransferForm';
import Balances from './Balances';

import Auth from '@/views/Auth';

import './style.scss';

@withRouter
@inject('userStore', 'balanceStore')
@observer
class HomePage extends Component {
  componentWillMount() {
    const {
      balanceStore,
      userStore: { currentUser },
      match: { params }
    } = this.props;

    if (currentUser) {
      balanceStore.loadBalances(currentUser.account);
    } else if (params) {
      balanceStore.loadBalances(params.account);
    }
  }

  render() {
    const { balances } = this.props.balanceStore;
    const { currentUser } = this.props.userStore;

    const hasAccountParam = this.props.match.params.account;

    const tokenData = Object.keys(tokens).map(key => ({
      balance: balances[key] || '0.0000',
      ...tokens[key]
    }));

    return (
      <div className="home-page">
        <Page.Header image="https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b69ccb54b9605ead6a49c6da0cbb007f&auto=format&fit=crop&w=1568&q=80">
          <h1 className="mb-3">My Own GXC</h1>
          {currentUser || hasAccountParam ? (
            <h2 className="font-weight-light">
              {currentUser ? currentUser.balance : 0}
              <small className="ml-2 font-weight-light">GXC</small>
            </h2>
          ) : (
            <h4 className="font-weight-light">
              <Link to="/login">Login </Link> first, I'll show your GXC amount.
            </h4>
          )}
        </Page.Header>

        <Page.Body>
          <div className="position-relative">
            <h4 className="mb-4">Transfer</h4>
            <div className="mb-5">
              <Auth
                renderLoggedIn={() => <TransferForm tokens={tokenData} />}
                renderLoggedOut={() => (
                  <React.Fragment>
                    <Link to="/login">Login </Link>
                    to transfer tokens
                  </React.Fragment>
                )}
              />
            </div>
          </div>

          <h4 className="mb-4">My GXC Interlocking Game</h4>

          <div className="mb-5">
            {currentUser || hasAccountParam ? (
              <Balances tokens={tokenData} />
            ) : (
              <React.Fragment>
                <Link to="/login">Login </Link>
                to view balances
              </React.Fragment>
            )}
          </div>
        </Page.Body>
      </div>
    );
  }
}

export default HomePage;
