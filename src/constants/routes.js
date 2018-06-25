import asyncComponent from '../components/AsyncComponent';

export const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('../pages/HomePage'))
  },
  {
    path: '/dgame',
    exact: true,
    component: asyncComponent(() => import('../pages/DgamePage'))
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
