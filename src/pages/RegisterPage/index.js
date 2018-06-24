import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { Fullscreen } from '@/components/Layout';
import LogoBox from '@/components/LogoBox';

@inject('authStore')
@observer
class Register extends React.Component {
  @observable email = '';
  @observable account = '';
  @observable password = '';

  async handleSubmit(e) {
    e.preventDefault();

    const { authStore } = this.props;
    const { email, account, password } = this;

    try {
      await authStore.register({ email, account, password });

      if (authStore.redirectParams && authStore.redirectParams.to) {
        return this.props.history.push(authStore.redirectParams.to);
      }

      this.props.history.push('/');
    } catch (errors) {
      console.error(errors);
      // showApiError(errors);
    }
  }

  render() {
    const { redirectParams } = this.props.authStore;

    return (
      <Fullscreen>
        <LogoBox />
        <h3 className="mb-4 text-center">Register to GXC Wallet</h3>

        <div className="size-sm">
          {redirectParams &&
            redirectParams.to && (
              <Alert color="primary">
                To play dgame, you must have a gxc account
              </Alert>
            )}

          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <Label for="email" hidden>
                email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                onChange={e => (this.email = e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="account" hidden>
                account name
              </Label>
              <Input
                id="account"
                autoComplete="account"
                placeholder="Account Name"
                onChange={e => (this.account = e.target.value)}
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
                Register
              </Button>
            </FormGroup>
            Already have an account? <Link to="/login">Login</Link>
          </Form>
        </div>
      </Fullscreen>
    );
  }
}

export default Register;
