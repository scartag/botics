import { accountModule } from '@/types/modules.type';
import { login, logout, register } from '@/types/actions.type';
import { isAuthenticated } from '@/types/getters.type';

export default class AccountService {
  constructor(accountApi, store) {
    this.accountApi = accountApi;
    this.store = store;
  }

  async login(request) {
    await this.store.dispatch(`${accountModule}/${login}`, request);
  }

  async register(request) {
    await this.store.dispatch(`${accountModule}/${register}`, request);
  }

  async passwordReset(request) {
    await this.accountApi.passwordReset(request);
  }

  async logout() {
    await this.store.dispatch(`${accountModule}/${logout}`);
  }

  get isAuthenticated() {
    return this.store.getters[`${accountModule}/${isAuthenticated}`];
  }
}
