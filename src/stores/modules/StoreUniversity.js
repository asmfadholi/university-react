import Api from 'services/index';
import { NOTIFICATION_OPTIONS } from 'utils/constants';
import { actionNotification } from './StoreNotification';

const pre = 'StoreUniversity/';

const initState = {
  listUniversity: {
    fetch: false, error: false, data: [], reRender: false,
  },
  listFavoriteUniversity: {
    fetch: false, error: false, data: [], reRender: false,
  },
};

export default function StoreUniversity(state = initState, action) {
  switch (action.type) {
    case `${pre}SET_LIST_UNIVERSITY`:
      return { ...state, listUniversity: action.data };
    case `${pre}SET_LIST_FAVORITE_UNIVERSITY`:
      return { ...state, listFavoriteUniversity: action.data };
    case `${pre}SET_FAVORITE_UNIVERSITY`: {
      const { listUniversity } = state;
      listUniversity.data[action.data.data].isLove = true;
      return {
        ...state,
        listUniversity: {
          ...listUniversity,
          reRender: !listUniversity.reRender,
        },
      };
    }
    case `${pre}UNSET_FAVORITE_UNIVERSITY`: {
      const { listFavoriteUniversity } = state;
      listFavoriteUniversity.data.splice(action.data.data, 1);
      return {
        ...state,
        listFavoriteUniversity: {
          ...listFavoriteUniversity,
          reRender: !listFavoriteUniversity.reRender,
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
  requestToggleFavoriteUniversity(req, index) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Get list university successfully';
      error.message = 'Get list university failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: index }, 'SET_FAVORITE_UNIVERSITY'));
        await Api.universityFavoriteToggle(req);
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: index }, 'SET_FAVORITE_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },

  requestAddFavoriteUniversity(req, index) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Add favorite university successfully';
      error.message = 'Add favorite university failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: index }, 'SET_FAVORITE_UNIVERSITY'));
        await Api.universityFavoriteAdd(req);
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: index }, 'SET_FAVORITE_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },

  requestDeleteFavoriteUniversity(req, index) {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Delete favorite university successfully';
      error.message = 'Delete favorite university failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: index }, 'UNSET_FAVORITE_UNIVERSITY'));
        await Api.universityFavoriteDelete(req);
        dispatch(actionNotification.showNotification(success));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: index }, 'UNSET_FAVORITE_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },

  requestListFavoriteUniversity() {
    return async (dispatch) => {
      const { success, error } = NOTIFICATION_OPTIONS.topCenter;
      success.message = 'Get list favorite university successfully';
      error.message = 'Get list favorite university failed';
      try {
        dispatch(this.receiveData({ fetch: true, error: false, data: [] }, 'SET_LIST_FAVORITE_UNIVERSITY'));
        const res = await Api.universityFavoriteList();
        dispatch(this.receiveData({ fetch: false, error: false, data: res }, 'SET_LIST_FAVORITE_UNIVERSITY'));
      } catch (err) {
        dispatch(this.receiveData({ fetch: false, error: true, data: [] }, 'SET_LIST_FAVORITE_UNIVERSITY'));
        dispatch(actionNotification.showNotification(error));
        throw err;
      }
    };
  },
};
