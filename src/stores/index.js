import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import StoreTodo from './modules/StoreTodo';
import StoreNotification, { actionNotification } from './modules/StoreNotification';
import StoreAuth, { actionAuth } from './modules/StoreAuth';
import StoreUniversity, { actionUniversity } from './modules/StoreUniversity';
import StoreNewsLetter, { actionNewsLetter } from './modules/StoreNewsLetter';

let composeEnhancers = compose;

if (process.browser) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  delete window.__PRELOADED_STATE__;
}

const reducers = combineReducers({
  StoreTodo,
  StoreNotification,
  StoreAuth,
  StoreUniversity,
  StoreNewsLetter,
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;

export {
  actionNotification,
  actionAuth,
  actionUniversity,
  actionNewsLetter,
};
