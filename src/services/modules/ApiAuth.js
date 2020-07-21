export default {
  userLogout() {
    const api = this.generateApi();
    return api.get('/user/logout').then((res) => res);
  },

  userLogin(req) {
    const api = this.generateApi();
    return api.post('/user/login', req).then((res) => res);
  },

  userForgotPassword(req) {
    const api = this.generateApi();
    return api.post('/user/forgot-password', req).then((res) => res);
  },

};
