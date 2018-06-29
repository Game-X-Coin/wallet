import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Table, Thead, Tbody, Trow, Tcol } from '@/components/Table';

import { tokens } from '@/constants/dgame';

import './style.scss';

@observer
class TrowadeListPage extends Component {
  @observable
  data = [
    {
      token: tokens.GQT,
      price: 1123,
      change: -44,
      volume: 100213
    },
    {
      token: tokens.GJL,
      price: 112,
      change: 0,
      volume: 213123
    },
    {
      token: tokens.GRG,
      price: 112,
      change: 12,
      volume: 123123
    }
  ];

  render() {
    return (
      <div className="trade-list-page shadow">
        <Table hover>
          <Thead>
            <Tcol flex={1.5}>SYMBOL</Tcol>
            <Tcol>PRICE</Tcol>
            <Tcol>24H CHANGE</Tcol>
            <Tcol>24H VOLUME</Tcol>
            <Tcol flex={0.3} />
          </Thead>
          <Tbody>
            {this.data.map((item, i) => {
              const changes =
                item.change > 0
                  ? 'text-danger'
                  : item.change < 0
                    ? 'text-primary'
                    : 'text-body';

              return (
                <Trow
                  key={i}
                  onClick={() =>
                    this.props.history.push(`/dex/${item.token.name}`)
                  }
                >
                  <Tcol flex={1.5}>
                    <div className="token">
                      <div
                        className="logo"
                        style={{ backgroundImage: `url(${item.token.logo})` }}
                      />
                      <div>
                        <h5 className="mb-0">{item.token.name} / GXC</h5>
                        <small className="font-weight-light">
                          {item.token.fullName}
                        </small>
                      </div>
                    </div>
                  </Tcol>
                  <Tcol className={changes}>{item.price}</Tcol>
                  <Tcol className={changes}>{item.change}%</Tcol>
                  <Tcol>{item.volume} GXC</Tcol>
                  <Tcol flex={0.3}>
                    <Link to={`/dex/${item.token.name}`}>trade</Link>
                  </Tcol>
                </Trow>
              );
            })}
          </Tbody>
        </Table>
      </div>
    );
  }
}

export default TrowadeListPage;
