import Api from 'services/index';
import { NOTIFICATION_OPTIONS } from 'utils/constants';
import { actionNotification } from './StoreNotification';

const pre = 'StoreUniversity/';

const initState = {
  listUniversity: {
    fetch: false, error: false, data: [], reRender: false,
  },
};

export default function StoreUniversity(state = initState, action) {
  switch (action.type) {
    case `${pre}SET_LIST_UNIVERSITY`:
      return { ...state, listUniversity: action.data };
    case `${pre}SET_FAVORITE_UNIVERSITY`: {
      const { listUniversity } = state;
      listUniversity.data[action.data].isLove = !listUniversity.data[action.data].isLove;
      return {
        ...state,
        listUniversity: {
          ...listUniversity,
          reRender: !listUniversity.reRender,
        },
      };
    }
    default:
      return state;
  }
}

export const actionUniversity = {
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
        dispatch(this.receiveData({ fetch: true, error: false, data: [] }, 'SET_LIST_UNIVERSITY'));
        const res = await Api.universitySearch(req);
        dispatch(this.receiveData({ fetch: false, error: false, data: res }, 'SET_LIST_UNIVERSITY'));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: [] }, 'SET_LIST_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
