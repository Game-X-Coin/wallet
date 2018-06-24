import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { Fullscreen } from '@/components/Layout';
import LogoBox from '@/components/LogoBox';

@inject('authStore')
@observer
class LoginPage extends Component {
  @observable email = '';
  @observable password = '';

  async handleSubmit(e) {
    e.preventDefault();

    const { authStore } = this.props;
    const { email, password } = this;

    try {
      await authStore.login({ email, password });

      if (authStore.redirectParams && authStore.redirectParams.to) {
        return this.props.history.push(authStore.redirectParams.to);
      }

      this.props.history.replace('/');
    } catch (errors) {
      console.log(errors);
      // showApiError(errors);
    }
  }

  render() {
    const { redirectParams } = this.props.authStore;

    return (
      <Fullscreen>
        <LogoBox />
        <h3 className="mb-4 text-center">Login to GXC Wallet</h3>

        <div className="size-sm">
          {redirectParams &&
            redirectParams.to && (
              <Alert color="primary">
                To play dgame, login to your gxc account
              </Alert>
            )}

          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <Label for="email" hidden>
                email
              </Label>
              <Input
                id="email"
                autoComplete="email"
                placeholder="Email"
                onChange={e => (this.email = e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" hidden>
                password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                onChange={e => (this.password = e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" block>
                Login
              </Button>
            </FormGroup>
            Don't have an account? <Link to="/register">Register</Link>
          </Form>
        </div>
      </Fullscreen>
    );
  }
}

export default LoginPage;
