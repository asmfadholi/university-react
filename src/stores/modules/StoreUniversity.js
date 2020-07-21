import Api from 'services/index';
import { NOTIFICATION_OPTIONS } from 'utils/constants';
import { actionNotification } from './StoreNotification';

const pre = 'StoreUniversity/';

const initState = {
  listUniversity: { fetch: false, error: false, data: [] },
};

export default function StoreAuth(state = initState, action) {
  switch (action.type) {
    case `${pre}SET_LIST_UNIVERSITY`:
      return { ...state, listUniversity: action.data };
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
  requestListUniversity(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Get list university successfully';
      error.message = 'Get list university failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: null }, 'SET_LIST_UNIVERSITY'));
        const res = await Api.userLogin(req);
        dispatch(this.receiveData({ fetch: false, error: false, data: res.data }, 'SET_LIST_UNIVERSITY'));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: null }, 'SET_LIST_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
