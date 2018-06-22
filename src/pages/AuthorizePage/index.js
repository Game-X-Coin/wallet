import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';
import { Form, Input, Button, Alert } from 'reactstrap';

import LogoBox from '@/components/LogoBox';
import { oauthAPI } from '@/services/api';

const { API_ROOT } = process.env;

@inject('authStore', 'userStore', 'commonStore')
@observer
class AuthorizePage extends Component {
  @observable transactionId = '';

  componentWillMount() {
    const { authStore, userStore } = this.props;
    const { pathname, search } = window.location;
    const params = qs.parse(search);

    if (!userStore.currentUser) {
      authStore.redirectParams = {
        to: pathname + search
      };

      this.props.history.push('/register');
    } else {
      oauthAPI.getTransaction(params).then(res => {
        this.transactionId = res.transactionId;
      });
    }
  }

  render() {
    const { currentUser } = this.props.userStore;
    const { token } = this.props.commonStore;

    return (
      <div>
        <LogoBox />
        <Alert color="primary">
          Welcome back! {currentUser && `'${currentUser.account}'`}
        </Alert>

        <Form method="post" action={`${API_ROOT}/oauth/authorize`}>
          <Input
            type="hidden"
            name="transaction_id"
            value={this.transactionId}
          />
          <Input type="hidden" name="jwt" value={token} />
          <Button color="primary" type="submit" block>
            GXC Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default AuthorizePage;
