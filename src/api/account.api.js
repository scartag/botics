export default class AccountApi {
  constructor(axios) {
    this.axios = axios;
    this.endPoint = 'rest-auth';
  }

  async login(request) {
    return await this.axios.post(`${this.endPoint}/login/`, request);
  }

  async register(request) {
    return await this.axios.post(`${this.endPoint}/registration/`, request);
  }

  async passwordReset(request) {
    return await this.axios.post(`${this.endPoint}/password/reset/`, request);
  }

  async logout() {
    return await this.axios.post(`${this.endPoint}/logout/`, {});
  }
}
