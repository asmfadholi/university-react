export default {
  newsLetterList() {
    const api = this.generateApiLocal();
    return api.get('/newsletter').then((res) => res);
  },

};
