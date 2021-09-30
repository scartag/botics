import { appOptions } from '@/types/getters.type';

const module = {
  namespaced: true,
  state: () => ({
    options: [
      { type: 'Web', framework: 'Django', name: 'Web', description: 'A Django based web application' },
      { type: 'Mobile', framework: 'React Native', name: 'Mobile App', description: 'A mobile application built with React Native' },
    ],
  }),
  mutations: {},
  actions: {},
  getters: {
    [appOptions]: (state) => {
      return state.options;
    },
  },
};

export default module;
