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
    case `${pre}ADD_LIST_NEWSLETTER`:
      return {
        ...state,
        listNewsLetter:
        {
          ...state.listNewsLetter,
          ...action.data,
          data: [
            ...state.listNewsLetter.data,
            ...action.data.data,
          ],
        },
      };
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

  requestCreateNewsLetter(req) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Create newsletter successfully';
      error.message = 'Create newsletter failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: [] }, 'ADD_LIST_NEWSLETTER'));
        await Api.newsLetterCreate(req);
        dispatch(this.receiveData({ fetch: false, error: false, data: [req] }, 'ADD_LIST_NEWSLETTER'));
      } catch (err) {
        error.message = err.message;
        dispatch(this.receiveData({ fetch: false, error: true, data: [] }, 'ADD_LIST_NEWSLETTER'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
