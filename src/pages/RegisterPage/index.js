import React from 'react';
import {} from 'mobx';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import LogoBox from '@/components/LogoBox';

@inject('authStore')
@observer
class Register extends React.Component {
  async handleSubmit(e) {
    e.preventDefault();
    /* 
    const { authStore } = this.props;

    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      this.props.authStore.setEmail(values.email);
      this.props.authStore.setAccount(values.account);
      this.props.authStore.setPassword(values.password);
      try {
        await this.props.authStore.register();
        if (authStore.redirectParams && authStore.redirectParams.to) {
          return this.props.history.push(authStore.redirectParams.to);
        }
        this.props.history.push('/welcome');
      } catch (errors) {
        console.error(errors);
        showApiError(errors);
      }
    }); */
  }

  render() {
    return (
      <div>
        <LogoBox />
        <Alert color="primary">Register gxc wallet to start gxc dgame.</Alert>

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
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" hidden>
              password
            </Label>
            <Input id="password" type="password" placeholder="Password" />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" block>
              Register
            </Button>
          </FormGroup>
          Already have an account? <Link to="/login">Login</Link>
        </Form>
      </div>
    );
  }
}

export default Register;
