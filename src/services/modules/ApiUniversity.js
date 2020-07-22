export default {
  universitySearch(req) {
    const { name, country } = req;
    const api = this.generateApi();
    return api.get(`/search?name=${name}&country=${country}`).then((res) => res);
  },

  universityFavoriteToggle(req) {
    const api = this.generateApiLocal();
    return api.post('/university/favorite', req).then((res) => res);
  },

  universityFavoriteList() {
    const api = this.generateApiLocal();
    return api.get('/university/favorite').then((res) => res);
  },

};
