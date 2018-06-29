import asyncComponent from '../components/AsyncComponent';

export const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('../pages/HomePage'))
  },
  {
    path: '/@:account',
    exact: true,
    component: asyncComponent(() => import('../pages/HomePage'))
  },
  {
    path: '/dgame',
    exact: true,
    component: asyncComponent(() => import('../pages/DgamePage'))
  },
  {
    path: '/dex',
    component: asyncComponent(() => import('../pages/DexPage'))
  },
  {
    path: '/profile',
    exact: true,
    isPrivate: true,
    component: asyncComponent(() => import('../pages/ProfilePage'))
  },
  {
    path: '/login',
    exact: true,
    isFullscreen: true,
    component: asyncComponent(() => import('../pages/LoginPage'))
  },
  {
    path: '/register',
    exact: true,
    isFullscreen: true,
    component: asyncComponent(() => import('../pages/RegisterPage'))
  },
  {
    path: '/authorize',
    exact: true,
    isFullscreen: true,
    component: asyncComponent(() => import('../pages/AuthorizePage'))
  }
];

export const dexRoutes = [
  {
    path: '/dex',
    exact: true,
    component: asyncComponent(() => import('../pages/DexPage/TradeListPage'))
  },
  {
    path: '/dex/:token',
    exact: true,
    component: asyncComponent(() => import('../pages/DexPage/TradeDetailPage'))
  }
];
