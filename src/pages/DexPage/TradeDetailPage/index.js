import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { observable, action, computed, runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { Table, Ttitle, Thead, Tbody, Trow, Tcol } from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import TradeChart from './TradeChart';

import Auth from '@/views/Auth';
import { tokens } from '@/constants/dgame';
import { dexAPI } from '@/services/api';

import './style.scss';

const getData = () => {
  var base = new Date(2015, 9, 3).getTime();
  var oneDay = 24 * 3600 * 1000;

  let arr = [{ timestamp: base, value: 1000 }];

  for (var i = 1; i < 100; i++) {
    arr = [
      ...arr,
      {
        timestamp: base + oneDay + i,
        value: Math.round((Math.random() - 0.5) * 20 + arr[i - 1].value)
      }
    ];
  }

  return arr;
};

class Addon extends PureComponent {
  render() {
    return <div className="input-addon">{this.props.children}</div>;
  }
}

class FormValue extends PureComponent {
  render() {
    return <div className="form-value">{this.props.children}</div>;
  }
}

@observer
class TradeDetailPage extends Component {
  @observable chartData = getData(); // randomized data

  @observable myOffers = new Array(20).fill({
    isSell: Math.random() > 0.5 ? true : false,
  });
  @observable buyOffers = new Array(20).fill(0);
  @observable sellOffers = new Array(20).fill(0);

  @observable makerAvailable = 0;
  @observable makerPrice = 0;
  @observable makerAmount = 0;
  @computed
  get makerTotal() {
    return this.makerPrice * this.makerAmount;
  }

  @observable takerAvailable = 0;
  @observable takerPrice = 0;
  @observable takerAmount = 0;
  @computed
  get takerTotal() {
    return this.takerPrice * this.takerAmount;
  }

  @action
  handleChange(type, e) {
    this[type] = e.target.value;
  }

  @action
  handleMaker(e) {
    e.preventDefault();

    const { name } = tokens[this.props.match.params.token];

    dexAPI.createOrder({
      currency: name,
      price: this.makerPrice,
      amount: this.makerAmount,
      isSell: true
    });
  }

  @action
  handleTaker(e) {
    e.preventDefault();

    const { name } = tokens[this.props.match.params.token];

    dexAPI.createOrder({
      currency: name,
      price: this.takerPrice,
      amount: this.takerAmount
    });
  }

  @action
  componentDidMount() {
    // const { name } = tokens[this.props.match.params.token]; // get token info by route 'token' params

    setInterval(() => {
      const lastItem = this.chartData[this.chartData.length - 1];

      runInAction(() => {
        this.chartData = [
          ...this.chartData,
          {
            timestamp: lastItem.timestamp + 1000,
            value: lastItem.value + Math.round((Math.random() - 0.5) * 50)
          }
        ];
      });
    }, 1000);

    // using api
  }

  render() {
    const { name, fullName, logo } = tokens[this.props.match.params.token];

    return (
      <div className="trade-detail-page">
        <div className="p-4 mb-3">
          <div className="token">
            <div className="logo" style={{ backgroundImage: `url(${logo})` }} />
            <div>
              <h4 className="mb-0">{name}</h4>
              <p className="mb-0 font-weight-light">{fullName}</p>
            </div>
          </div>

          <Link to="/dex">See other tokens</Link>
        </div>

        <div className="trade-chart p-4 mb-5 shadow">
          {/* <LoadingSpinner /> */}
          <TradeChart data={this.chartData} />
        </div>

        <div className="order row">
          <div className="col-lg-6">
            <div className="mb-5 mr-lg-2 shadow">
              <h5
                className="px-4 py-3 border-danger"
                style={{ borderBottom: '3px solid' }}
              >
                Buy {name} using GXC
              </h5>
              <Form onSubmit={this.handleTaker.bind(this)}>
                <div className="px-4 py-2">
                  <FormGroup>
                    <Label>Available</Label>
                    <FormValue>{this.takerAvailable}</FormValue>
                    <Addon>GXC</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Price</Label>
                    <Input
                      value={this.takerPrice}
                      onChange={e => this.handleChange('takerPrice', e)}
                      type="number"
                      min="0"
                      required
                    />
                    <Addon>GXC</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Amount</Label>
                    <Input
                      value={this.takerAmount}
                      onChange={e => this.handleChange('takerAmount', e)}
                      type="number"
                      min="0"
                      required
                    />
                    <Addon>{name}</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Total</Label>
                    <FormValue>{this.takerTotal}</FormValue>
                    <Addon>GXC</Addon>
                  </FormGroup>
                </div>

                <div className="px-4 py-3 border-top">
                  <Auth
                    renderLoggedIn={() => (
                      <Button color="danger" type="submit" block>
                        Buy {name}
                      </Button>
                    )}
                    renderLoggedOut={() => (
                      <React.Fragment>
                        <Link to="/login">Login</Link> to buy {name}
                      </React.Fragment>
                    )}
                  />
                </div>
              </Form>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="mb-5 mr-lg-2 shadow">
              <h5
                className="px-4 py-3 border-primary"
                style={{ borderBottom: '3px solid' }}
              >
                Sell {name} for GXC
              </h5>
              <Form onSubmit={this.handleMaker.bind(this)}>
                <div className="px-4 py-2">
                  <FormGroup>
                    <Label>Available</Label>
                    <FormValue>{this.makerAvailable}</FormValue>
                    <Addon>{name}</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Price</Label>
                    <Input
                      value={this.makerPrice}
                      onChange={e => this.handleChange('makerPrice', e)}
                      type="number"
                      min="0"
                      required
                    />
                    <Addon>GXC</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Amount</Label>
                    <Input
                      value={this.makerAmount}
                      onChange={e => this.handleChange('makerAmount', e)}
                      type="number"
                      min="0"
                      required
                    />
                    <Addon>{name}</Addon>
                  </FormGroup>
                  <FormGroup>
                    <Label>Total</Label>
                    <FormValue>{this.makerTotal}</FormValue>
                    <Addon>GXC</Addon>
                  </FormGroup>
                </div>

                <div className="px-4 py-3 border-top">
                  <Auth
                    renderLoggedIn={() => (
                      <Button color="primary" type="submit" block>
                        Sell {name}
                      </Button>
                    )}
                    renderLoggedOut={() => (
                      <React.Fragment>
                        <Link to="/login">Login</Link> to sell {name}
                      </React.Fragment>
                    )}
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div className="mb-5 shadow">
          <Table striped>
            <Ttitle>Manage offers</Ttitle>
            <Thead>
              <Tcol>Time</Tcol>
              <Tcol>Type</Tcol>
              <Tcol>Price</Tcol>
              <Tcol>Amount</Tcol>
              <Tcol>Status</Tcol>
            </Thead>
            <Tbody height={300}>
              <Auth
                renderLoggedIn={() =>
                  this.myOffers.map((v, i) => (
                    <Trow key={i}>
                      <Tcol>123213123</Tcol>
                      <Tcol className="text-danger">sell</Tcol>
                      <Tcol>123213123</Tcol>
                      <Tcol>123213123</Tcol>
                      <Tcol>not selled</Tcol>
                    </Trow>
                  ))
                }
                renderLoggedOut={() => (
                  <div className="p-4">
                    <Link to="/login">Login</Link> to manage offers
                  </div>
                )}
              />
            </Tbody>
          </Table>
        </div>

        <div className="order row mb-5">
          <div className="col-lg-6">
            <div className="mr-lg-2 shadow">
              <Table striped>
                <Ttitle>Buy offers</Ttitle>
                <Thead>
                  <Tcol>Sum GXC</Tcol>
                  <Tcol>GXC</Tcol>
                  <Tcol>{name}</Tcol>
                  <Tcol>Price</Tcol>
                </Thead>
                <Tbody>
                  {this.buyOffers.map((v, i) => (
                    <Trow key={i}>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                    </Trow>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="ml-lg-2 shadow">
              <Table striped>
                <Ttitle>Sell offers</Ttitle>
                <Thead>
                  <Tcol>Price</Tcol>
                  <Tcol>{name}</Tcol>
                  <Tcol>GXC</Tcol>
                  <Tcol>Sum GXC</Tcol>
                </Thead>
                <Tbody>
                  {this.sellOffers.map((v, i) => (
                    <Trow key={i}>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                      <Tcol>123123</Tcol>
                    </Trow>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TradeDetailPage;
