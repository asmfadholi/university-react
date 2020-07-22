import Api from 'services/index';
import { NOTIFICATION_OPTIONS } from 'utils/constants';
import preloadedState from 'utils/preloadedState';
import { actionNotification } from './StoreNotification';

const pre = 'StoreAuth/';

const { StoreAuth: store = {} } = preloadedState;
const { isLogin } = store;

const initState = {
  isLogin: isLogin || {
    fetch: false, error: false, status: false, name: null, email: null,
  },
  isEmailExist: { fetch: false, error: false, status: false },
};

export default function StoreAuth(state = initState, action) {
  switch (action.type) {
    case `${pre}SET_AUTH`:
      return { ...state, isLogin: action.data };
    case `${pre}SET_EMAIL_EXISTENCE`:
      return { ...state, isEmailExist: action.data };
    default:
      return state;
  }
}

export const actionAuth = {
  receiveData(res, name) {
    return {
      type: pre + name,
      data: res,
    };
  },
  requestLogin(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.bottomCenter;
      success.message = 'Logged in successfully';
      error.message = 'email or password is invalid';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, status: false }, 'SET_AUTH'));
        await Api.userLogin(req);
        dispatch(this.receiveData({ fetch: false, error: false, status: true }, 'SET_AUTH'));
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, status: false }, 'SET_AUTH'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
  requestForgotPassword(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.bottomCenter;
      success.message = 'Email is found, please check your email for confirmation';
      error.message = 'Email doesn\'t exist';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, status: false }, 'SET_EMAIL_EXISTENCE'));
        await Api.userForgotPassword(req);
        dispatch(this.receiveData({ fetch: false, error: false, status: true }, 'SET_EMAIL_EXISTENCE'));
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, status: false }, 'SET_EMAIL_EXISTENCE'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
  requestRegister(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.bottomCenter;
      success.message = 'Account register successfully';
      // error.message = 'Account failed to register';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, status: false }, 'SET_AUTH'));
        await Api.userRegister(req);
        dispatch(this.receiveData({ fetch: false, error: false, status: true }, 'SET_AUTH'));
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, status: false }, 'SET_AUTH'));
        error.message = err.message;
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
  requestLogout() {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Logged out successfully';
      error.message = 'Logged out failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, status: true }, 'SET_AUTH'));
        await Api.userLogout();
        dispatch(this.receiveData({ fetch: false, error: false, status: false }, 'SET_AUTH'));
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, status: true }, 'SET_AUTH'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
