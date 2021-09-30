import { appModule } from '@/types/modules.type';
import { appOptions } from '@/types/getters.type';

export default class AppService {
  constructor(appApi, store) {
    this.api = appApi;
    this.store = store;
  }

  async createApp(request) {
    await this.api.createApp(request);
  }

  async updateApp(id, request) {
    await this.api.updateApp(id, request);
  }

  async deleteApp(id) {
    return await this.api.deleteApp(id);
  }

  async getApps() {
    return await this.api.getApps();
  }

  async getApp(id) {
    return await this.api.getApp(id);
  }

  async getPlans() {
    return await this.api.getPlans();
  }

  async getSub(id) {
    return await this.api.getSub(id);
  }

  get appOptions() {
    return this.store.getters[`${appModule}/${appOptions}`];
  }

  async addSub(request) {
    return await this.api.addSub(request);
  }

  async updateSub(id, request) {
    return await this.api.updateSub(id, request);
  }
}
