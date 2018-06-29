const getImage = path => {
  const img = require(`../media/images/${path}`);
  return img.constructor === Object ? img.default : img;
};

const tokenInfo = {
  GQT: {
    name: 'GQT',
    fullName: 'GXCQuest',
    logo: getImage('token/gxquest.png'),
    color: '#FFD111'
  },
  GJL: {
    name: 'GJL',
    fullName: 'GameXJelly',
    logo: getImage('token/gxjelly.png'),
    color: 'rgb(252, 119, 32)'
  },
  GRG: {
    name: 'GRG',
    fullName: 'GameXRogue',
    logo: getImage('token/gxrogue.png'),
    color: 'rgb(21, 159, 62)'
  }
};

const gameInfo = {
  GXCQuest: {
    name: 'GXCQuest',
    genre: 'MORPG',
    url: 'http://gxcquest.com',
    logo: getImage('game/gxcquest_logo.png'),
    demo: getImage('game/gxcquest_demo.png'),
    description: 'The first game running on the GXC blockchain',
    howto: 'Kill monsters',
    tokens: [tokenInfo.GQT]
  },
  GameXJelly: {
    name: 'GameXJelly',
    genre: 'Puzzle',
    url: '',
    logo: getImage('game/gamexjelly_logo.png'),
    demo: getImage('game/gamexjelly_demo.png'),
    description: 'Puzzle running on the GXC blockchain',
    howto: 'Winning three stars on each stage',
    tokens: [tokenInfo.GJL]
  },
  GameXRogue: {
    name: 'GameXRogue',
    genre: 'MORPG',
    url: 'http://gamexrogue.com',
    logo: getImage('game/gxrogue_logo.png'),
    demo: getImage('game/gxrogue_demo.png'),
    description: 'The first game running on the GXC blockchain',
    howto: 'Kill monsters',
    tokens: [tokenInfo.GRG]
  }
};

export const tokens = {
  GQT: {
    ...tokenInfo.GQT,
    game: gameInfo.GXCQuest
  },
  GJL: {
    ...tokenInfo.GJL,
    game: gameInfo.GameXJelly
  },
  GRG: {
    ...tokenInfo.GRG,
    game: gameInfo.GameXRogue
  }
};

export const games = gameInfo;
