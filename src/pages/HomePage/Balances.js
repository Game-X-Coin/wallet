import React from 'react';

const Balances = ({ tokens }) => {
  return (
    <div className="row">
      {tokens.map(token => (
        <div className="col-md-6" key={token.name}>
          <div
            className="balance"
            style={{
              borderBottom: `5px solid ${token.color}`
            }}
          >
            <h5 className="value">
              {token.balance} {token.name}
            </h5>

            <a href={token.game.url} target="_blank">
              <div
                className="logo"
                style={{ backgroundImage: `url(${token.game.logo})` }}
              />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balances;
