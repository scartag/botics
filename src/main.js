import { createApp, h } from 'vue';
import { router } from './router/router';
import injector from 'vue-inject';
import App from './App.vue';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

import 'tailwindcss/tailwind.css';
import './assets/style.css';

import store from '@/store';
import axiosInstance from '@/api/axiosInstance';

const app = createApp({
  computed: {
    ViewComponent() {
      switch (this.$route.path) {
        case '/login':
          return Login;
        case '/register':
          return Register;
        case '/forgot-password':
          return ForgotPassword;
        default:
          return App;
      }
    },
  },
  render() {
    return h(this.ViewComponent);
  },
});

app.use(store);
app.use(router);

injector.constant('store', store);
injector.constant('router', router);
injector.constant('axiosInstance', axiosInstance);

app.use(injector);

require('@/services');

app.mount('#app');
