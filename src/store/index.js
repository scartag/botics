import { createStore } from 'vuex';
import account from '@/store/modules/account';
import app from '@/store/modules/app';
export default createStore({
  modules: {
    account,
    app,
  },
});
