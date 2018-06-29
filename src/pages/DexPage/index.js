import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Page } from '@/components/Layout';
import { dexRoutes } from '@/constants/routes';

import './style.scss';

class DexPage extends Component {
  render() {
    return (
      <div className="dex-page">
        <Page.Header image="https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b69ccb54b9605ead6a49c6da0cbb007f&auto=format&fit=crop&w=1568&q=80">
          <h1 className="mb-3">GXC Decentralized Exchange</h1>
          <h5 className="font-weight-light">
            Trade assets on the GXC Network.
          </h5>
        </Page.Header>

        <Page.Body>
          <Switch>
            {dexRoutes.map((route, i) => <Route key={i} {...route} />)}
          </Switch>
        </Page.Body>
      </div>
    );
  }
}

export default DexPage;
