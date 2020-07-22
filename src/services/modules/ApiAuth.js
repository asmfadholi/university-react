export default {
  userLogout() {
    const api = this.generateApiLocal();
    return api.get('/user/logout').then((res) => res);
  },

  userLogin(req) {
    const api = this.generateApiLocal();
    return api.post('/user/login', req).then((res) => res);
  },

  userRegister(req) {
    const api = this.generateApiLocal();
    return api.post('/user/register', req).then((res) => res);
  },

  userForgotPassword(req) {
    const api = this.generateApiLocal();
    return api.post('/user/forgot-password', req).then((res) => res);
  },

};
