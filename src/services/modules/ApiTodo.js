export default {
  listTodo() {
    const api = this.generateApi();
    return api.get('todos').then((res) => res);
  },

  detailTodo(req) {
    const api = this.generateApi();
    return api.get(`todos/${req.id}`).then((res) => res);
  },

  addTodo(req) {
    const api = this.generateApi();
    return api.post('todos', req).then((res) => res);
  },

  editTodo(req) {
    const api = this.generateApi();
    return api.put(`todos/${req.id}`, req).then((res) => res);
  },

  deleteTodo(req) {
    const api = this.generateApi();
    return api.delete(`todos/${req.id}`).then((res) => res);
  },

};
