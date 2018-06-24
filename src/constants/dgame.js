const getImage = path => {
  const img = require(`../media/images/${path}`);
  return img.constructor === Object ? img.default : img;
};

const tokenInfo = {
  GXQ: {
    name: 'GXQ',
    logo: getImage('token/gxq.png'),
    color: '#FFD111'
  }
};

const gameInfo = {
  GXCQuest: {
    name: 'GXCQuest',
    genre: 'MORPG',
    url: 'http://gxcquest.com',
    logo: getImage('game/gxcquest.png'),
    description: 'The first game running on the GXC blockchain',
    howto: 'Kill monsters to earn GXC',
    tokens: [tokenInfo.GXQ, tokenInfo.GXQ]
  }
};

export const tokens = {
  GXQ: {
    ...tokenInfo.GXQ,
    game: gameInfo.GXCQuest
  }
};

export const games = gameInfo;
