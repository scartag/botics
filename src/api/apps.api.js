export default class AppsApi {
  constructor(axios) {
    this.axios = axios;
    this.endPoint = 'api/v1';
  }

  async createApp(request) {
    await this.axios.post(`${this.endPoint}/apps/`, request);
  }

  async updateApp(id, request) {
    await this.axios.put(`${this.endPoint}/apps/${id}/`, request);
  }

  async deleteApp(id) {
    return await this.axios.delete(`${this.endPoint}/apps/${id}/`);
  }

  async getApps() {
    return await this.axios.get(`${this.endPoint}/apps/`);
  }

  async getApp(id) {
    return await this.axios.get(`${this.endPoint}/apps/${id}/`);
  }

  async getPlans() {
    return await this.axios.get(`${this.endPoint}/plans/`);
  }

  async getSub(id) {
    return await this.axios.get(`${this.endPoint}/subscriptions/${id}/`);
  }

  async addSub(request) {
    return await this.axios.post(`${this.endPoint}/subscriptions/`, request);
  }

  async updateSub(id, request) {
    return await this.axios.put(`${this.endPoint}/subscriptions/${id}/`, request);
  }
}
