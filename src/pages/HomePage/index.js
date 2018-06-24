import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Page } from '@/components/Layout';

import { tokens } from '@/constants/dgame';

import './style.scss';

@inject('userStore', 'balanceStore')
@observer
class HomePage extends Component {
  componentWillMount() {
    const { balanceStore, userStore } = this.props;

    balanceStore.loadBalances(userStore.currentUser.account);
  }

  render() {
    const { currentUser } = this.props.userStore;
    const { balances } = this.props.balanceStore;

    const tokenData = Object.keys(balances).map(key => ({
      balance: balances[key],
      ...tokens[key]
    }));

    return (
      <div className="home-page">
        <Page.Header image="https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b69ccb54b9605ead6a49c6da0cbb007f&auto=format&fit=crop&w=1568&q=80">
          <h1 className="mb-3">My Own GXC</h1>
          <h2 className="font-weight-light">
            {currentUser && currentUser.balance}{' '}
            <small className="font-weight-light">GXC</small>
          </h2>
        </Page.Header>

        <Page.Body>
          <h4 className="mb-3">My GXC Interlocking Game</h4>

          <div className="row">
            {tokenData.map(token => (
              <div className="col-md-6" key={token.name}>
                <div
                  className="col-12 balance"
                  style={{
                    borderBottom: `5px solid ${token.color}`
                  }}
                >
                  <h5 className="value">
                    {token.balance} {token.name}
                  </h5>

                  <a href={token.game.url} target="_blank">
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${token.logo})` }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Page.Body>
      </div>
    );
  }
}

export default HomePage;
