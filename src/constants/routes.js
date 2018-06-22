import asyncComponent from '../components/AsyncComponent';

export const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('../pages/WelcomePage'))
  },
  {
    path: '/login',
    exact: true,
    component: asyncComponent(() => import('../pages/Auth/LoginPage'))
  },
  {
    path: '/register',
    exact: true,
    component: asyncComponent(() => import('../pages/Auth/RegisterPage'))
  },
  {
    path: '/authorize',
    exact: true,
    component: asyncComponent(() => import('../pages/Auth/AuthorizePage'))
  }
];
