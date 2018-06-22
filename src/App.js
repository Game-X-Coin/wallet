import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Routes from './Routes';
import { Header, Body, Footer } from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

@withRouter
@inject('userStore', 'commonStore')
@observer
class App extends Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore
        .pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { commonStore } = this.props;
    const isPopupWindow = window.opener && window.opener !== window;

    return (
      <div id="app">
        {commonStore.appLoaded ? (
          isPopupWindow ? (
            <Routes />
          ) : (
            <React.Fragment>
              <Header />
              <Body>
                <Routes />
              </Body>
              <Footer />
            </React.Fragment>
          )
        ) : (
          <LoadingSpinner global />
        )}

        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    );
  }
}

export default hot(module)(App);
