import request from '@/utils/request';

export const authAPI = {
  current: () => {
    return request({ url: '/users/profile' });
  },
  login: data => request({ url: '/auth/login', method: 'post', data }),
  register: data => request({ url: '/auth/register', method: 'post', data }),
  save: user => request({ url: '/user', method: 'put', data: { user } })
};

export const oauthAPI = {
  getTransaction: params => request({ url: '/oauth/transaction', params }),
  authorize: transaction_id =>
    request({
      url: '/oauth/authorize',
      method: 'post',
      data: { transaction_id }
    })
};

export const profileAPI = {
  get: username => request({ url: `/profiles/${username}` })
};

export const walletAPI = {
  all: () => request({ url: '/wallets' }),
  createWallet: walletName =>
    request({ url: '/wallets', method: 'post', data: { walletName } })
};

export const eosAPI = {
  requestFaucet: () => request({ url: '/eos/request_faucet', method: 'post' }),
  balances: accountName =>
    request({ url: `/eos/balances?accountName=${accountName}` })
};

export const transactionAPI = {
  load: id => request({ url: `/eos/transaction/${id}` }),
  new: data => request({ url: '/eos/transaction', method: 'post', data })
};

export const dexAPI = {
  getList: data => request({ url: '/dex/list', method: 'post', data }),
  createOrder: data => request({ url: '/dex/order', method: 'post', data })
};
