export default {
  universitySearch(req) {
    const { name, country } = req;
    const api = this.generateApi();
    return api.get(`/search?name=${name}&country=${country}`).then((res) => res);
  },

};
