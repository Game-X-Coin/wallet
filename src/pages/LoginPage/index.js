import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import LogoBox from '@/components/LogoBox';

@inject('authStore')
@observer
class LoginPage extends Component {
  async handleSubmit(e) {
    e.preventDefault();
    /* const { authStore } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (err) return;
      this.props.authStore.setEmail(values.email);
      this.props.authStore.setPassword(values.password);
      try {
        await this.props.authStore.login();
        if (authStore.redirectParams && authStore.redirectParams.to) {
          return this.props.history.push(authStore.redirectParams.to);
        }
        this.props.history.replace('/balance');
      } catch (errors) {
        console.log(errors);
        showApiError(errors);
      }
    }); */
  }

  render() {
    return (
      <div>
        <LogoBox />
        <Alert color="info">Login gxc wallet to start gxc dgame.</Alert>

        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <Label for="email" hidden>
              email
            </Label>
            <Input id="email" autoComplete="email" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password" hidden>
              password
            </Label>
            <Input id="password" type="password" placeholder="Password" />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit" block>
              Login
            </Button>
          </FormGroup>
          Don't have an account? <Link to="/register">Register</Link>
        </Form>
      </div>
    );
  }
}

export default LoginPage;
