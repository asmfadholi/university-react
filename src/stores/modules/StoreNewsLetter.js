import Api from 'services/index';
import { NOTIFICATION_OPTIONS } from 'utils/constants';
import { actionNotification } from './StoreNotification';

const pre = 'StoreNewsLetter/';

const initState = {
  listNewsLetter: {
    fetch: false, error: false, data: [], reRender: false,
  },
};

export default function StoreUniversity(state = initState, action) {
  switch (action.type) {
    case `${pre}SET_LIST_NEWSLETTER`:
      return { ...state, listNewsLetter: action.data };
    default:
      return state;
  }
}

export const actionNewsLetter = {
  receiveData(res, name) {
    return {
      type: pre + name,
      data: res,
    };
  },

  requestListNewsLetter(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Get list newsletter successfully';
      error.message = 'Get list newsletter failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: [] }, 'SET_LIST_NEWSLETTER'));
        const res = await Api.newsLetterList(req);
        dispatch(this.receiveData({ fetch: false, error: false, data: res }, 'SET_LIST_NEWSLETTER'));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: [] }, 'SET_LIST_NEWSLETTER'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
