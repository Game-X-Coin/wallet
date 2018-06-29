import React, { Component } from 'react';
import { observable, action, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Form, Input, Button } from 'reactstrap';
import qs from 'query-string';

import { oauthAPI } from '@/services/api';

import { games } from '@/constants/dgame';

import { Fullscreen } from '@/components/Layout';
import LogoBox from '@/components/LogoBox';

import './style.scss';

const { API_ENDPOINT } = process.env;

@inject('authStore', 'userStore', 'commonStore')
@observer
class AuthorizePage extends Component {
  @observable loading = true;
  @observable transactionId = '';
  @observable client = '';

  @action
  async componentWillMount() {
    const { authStore, userStore } = this.props;
    const { pathname, search } = window.location;
    const params = qs.parse(search);

    if (!userStore.currentUser) {
      authStore.redirectParams = {
        to: pathname + search
      };

      this.props.history.push('/register');
    } else {
      const { transactionId, client } = await oauthAPI.getTransaction(params);

      runInAction(() => {
        this.transactionId = transactionId;
        this.client = client.name;
        this.loading = false;
      });
    }
  }

  render() {
    const { currentUser } = this.props.userStore;
    const { token: jwt } = this.props.commonStore;

    const game = this.client && games[this.client];

    return (
      <Fullscreen className="authorize-page">
        <LogoBox />
        <h3 className="mb-4 text-center">Login with GXC</h3>

        <div className="size-sm">
          <div className="game position-relative mb-3">
            <div
              className="logo"
              style={{ backgroundImage: `url(${game && game.demo})` }}
            />
            <div className="description">
              <a target="_blank" href={game && game.url}>
                {game ? game.name : 'dgame'}
              </a>
              <p>wants to access your account</p>
            </div>
          </div>

          <Form method="post" action={`${API_ENDPOINT}/oauth/authorize`}>
            <Input
              type="hidden"
              name="transaction_id"
              value={this.transactionId}
            />
            <Input type="hidden" name="jwt" value={jwt} />
            <Button color="primary" type="submit" disabled={this.loading} block>
              Continue as {currentUser && currentUser.account}
            </Button>
          </Form>
        </div>
      </Fullscreen>
    );
  }
}

export default AuthorizePage;
