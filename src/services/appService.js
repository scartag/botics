export default class AppService {
  constructor(appApi, store) {
    this.api = appApi;
    this.store = store;
  }

  async getApps() {
    return await this.api.getApps();
  }

  async getApp(id) {
    return await this.api.getApp(id);
  }
}
