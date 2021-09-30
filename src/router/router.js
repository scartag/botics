import { createRouter, createWebHistory } from 'vue-router';
import { routeNames } from '@/router/routes';
import authGuard from '@/router/authGuard';

const routes = [
  {
    path: '/',
    name: routeNames.dashboard,
    exact: true,
    component: () => import('../pages/Dashboard.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/create-app',
    name: routeNames.createApp,
    exact: true,
    component: () => import('../pages/Create.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/manage-app/:id',
    name: routeNames.manageApp,
    exact: true,
    props: true,
    component: () => import('../pages/Manage.vue'),
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: routeNames.login,
    exact: true,
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/register',
    name: routeNames.register,
    exact: true,
    component: () => import('../pages/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: routeNames.forgotPassword,
    exact: true,
    component: () => import('../pages/ForgotPassword.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
