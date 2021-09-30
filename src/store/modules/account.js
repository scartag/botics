import injector from 'vue-inject';
import { getToken, isAuthenticated } from '@/types/getters.type';
import { login, logout, register } from '@/types/actions.type';
import { setToken, removeToken } from '@/types/mutations.type';
import { accountApi } from '@/types/dependencies.type';

const module = {
  namespaced: true,
  state: () => ({
    token: null,
  }),
  mutations: {
    [setToken]: (state, token) => {
      state.token = token;
    },
    [removeToken]: (state) => {
      state.token = null;
    },
  },
  actions: {
    [login]: async (context, request) => {
      const api = injector.get(accountApi);
      const r = await api.login(request);
      const token = r.data.key;
      context.commit(setToken, token);
    },

    [register]: async (context, request) => {
      const api = injector.get(accountApi);
      const r = await api.register(request);
      const token = r.data.key;
      context.commit(setToken, token);
    },
    [logout]: async (context) => {
      const api = injector.get(accountApi);
      await api.logout();
      context.commit(removeToken);
    },
  },
  getters: {
    [getToken]: (state) => {
      return state.token;
    },

    [isAuthenticated]: (state) => {
      return !!state.token;
    },
  },
};

export default module;
