import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { routes } from './constants';
import { Header, Body, Footer } from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import Auth from './views/Auth';

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

    const Routes = () =>
      routes.map((route, index) => (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          render={() => {
            const RouteComp = () =>
              route.isFullscreen ? (
                <route.component />
              ) : (
                <React.Fragment>
                  <Header />
                  <Body>
                    <route.component />
                  </Body>
                  <Footer />
                </React.Fragment>
              );

            return route.isPrivate ? (
              <Auth
                renderLoggedIn={() => <RouteComp />}
                renderLoggedOut={() => <Redirect to="/login" />}
              />
            ) : (
              <RouteComp />
            );
          }}
        />
      ));

    return (
      <div id="app">
        {commonStore.appLoaded ? (
          <Switch>
            <Routes />
          </Switch>
        ) : (
          <LoadingSpinner global />
        )}
        {process.env.NODE_ENV !== 'production' && <DevTools />}
      </div>
    );
  }
}

export default hot(module)(App);
