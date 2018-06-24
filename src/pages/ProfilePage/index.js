import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Page } from '@/components/Layout';

@inject('userStore')
@observer
class ProfilePage extends Component {
  render() {
    const { currentUser } = this.props.userStore;

    return (
      <div>
        <Page.Header image="https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b69ccb54b9605ead6a49c6da0cbb007f&auto=format&fit=crop&w=1568&q=80">
          <h1 className="mb-3">Profile</h1>
          <h5 className="font-weight-light">
            It's about you, {currentUser && currentUser.account}
          </h5>
        </Page.Header>

        <Page.Body>
          <h4 className="mb-4">Profile</h4>

          <div className="mb-5">
            <p>Account: {currentUser && currentUser.account}</p>
            <p>Email: {currentUser && currentUser.email}</p>
            <p>Total balance: {currentUser && `${currentUser.balance} GXC`}</p>
          </div>

          <h4 className="mb-4">Permissions</h4>

          <div className="mb-5">
            <p>Owner public key: {currentUser && currentUser.ownerPublicKey}</p>
            <p>
              Active public key: {currentUser && currentUser.activePublicKey}
            </p>
          </div>
        </Page.Body>
      </div>
    );
  }
}

export default ProfilePage;
