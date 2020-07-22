export default {
  newsLetterList() {
    const api = this.generateApiLocal();
    return api.get('/newsletter').then((res) => res);
  },

  newsLetterCreate(req) {
    const api = this.generateApiLocal();
    return api.post('/newsletter', req).then((res) => res);
  },

};
