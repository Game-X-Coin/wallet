const getTokenImage = imgName => {
  const img = require(`../media/images/token/${imgName}`);
  return img.constructor === Object ? img.default : img;
};

export default {
  GXQ: {
    img: getTokenImage('gxq.png'),
    color: '#FFD111',
    gameUrl: 'http://gxcquest.com'
  }
};
