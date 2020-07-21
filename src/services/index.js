import Api from './modules/Api';
import ApiTodo from './modules/ApiTodo';
import ApiAuth from './modules/ApiAuth';
import ApiUniversity from './modules/ApiUniversity';

export default {
  ...Api,
  ...ApiTodo,
  ...ApiAuth,
  ...ApiUniversity,
};
