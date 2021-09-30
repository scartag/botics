export default class AppsApi {
  constructor(axios) {
    this.axios = axios;
    this.endPoint = 'api/v1';
  }

  async getApps() {
    return await this.axios.get(`${this.endPoint}/apps/`);
  }

  async getApp(id) {
    return await this.axios.get(`${this.endPoint}/apps/${id}/`);
  }

  async getPlans() {}

  async getSub(id) {}
}
