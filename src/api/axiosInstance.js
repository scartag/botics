import axios from 'axios';
import store from '@/store';
import { router } from '@/router/router';
import { routeNames } from '@/router/routes';
import { getToken } from '@/types/getters.type';
import { accountModule } from '@/types/modules.type';
import { removeToken } from '@/types/mutations.type';

const CSRF_COOKIE = 'csrftoken';
const CSRF_HEADER = 'X-CSRFToken';

const instance = axios.create({
  baseURL: 'https://hiring-example-25770.botics.co/',
  xsrfCookieName: CSRF_COOKIE,
  xsrfHeaderName: CSRF_HEADER,
});

instance.interceptors.request.use((config) => {
  const accessToken = store.getters[`${accountModule}/${getToken}`];
  if (accessToken) {
    config.headers['Authorization'] = `Token ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...');
      store.commit(`${accountModule}/${removeToken}`);
      router.replace({ name: routeNames.login });
    }
    return Promise.reject(error.response);
  }
);

export default instance;
