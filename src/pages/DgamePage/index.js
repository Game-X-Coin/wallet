import React, { Component } from 'react';

import { games } from '@/constants/dgame';

import { Page } from '@/components/Layout';

import './style.scss';

class DgamePage extends Component {
  render() {
    const { GXCQuest } = games;

    return (
      <div className="dgame-page">
        <Page.Header image={GXCQuest.demo}>
          <h1 className="mb-3">{GXCQuest.name}</h1>
          <h5 className="font-weight-light">{GXCQuest.description}</h5>
        </Page.Header>

        <Page.Body>
          <h4 className="mb-4">GXC Dgame</h4>

          <div className="row">
            {Object.keys(games).map(key => {
              const game = games[key];

              return (
                <div className="col-lg-6" key={key}>
                  <div className="game">
                    <div
                      className="logo"
                      style={{ backgroundImage: `url(${game.demo})` }}
                    />

                    <div className="info">
                      <div className="mb-3">
                        <a href={game.url} target="_blank">
                          <h5>{game.name}</h5>
                        </a>
                        <small>{game.genre}</small>
                      </div>

                      <p className="tokens">
                        Used tokens:{' '}
                        {game.tokens.map(token => token.name).join(', ')}
                      </p>
                      <p className="howto">{game.howto} to earn tokens</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Page.Body>
      </div>
    );
  }
}

export default DgamePage;
