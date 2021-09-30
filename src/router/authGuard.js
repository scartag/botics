import store from '@/store';
import { routeNames } from '@/router/routes';
import { accountModule } from '@/types/modules.type';
import { isAuthenticated } from '@/types/getters.type';

const requireAuth = (to, from, next) => {
  if (!store.getters[`${accountModule}/${isAuthenticated}`]) {
    next({ name: routeNames.login });
  } else {
    next();
  }
};

export default requireAuth;
