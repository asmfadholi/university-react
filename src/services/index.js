import Api from './modules/Api';
import ApiTodo from './modules/ApiTodo';
import ApiAuth from './modules/ApiAuth';

export default {
  ...Api,
  ...ApiTodo,
  ...ApiAuth,
};
