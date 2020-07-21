const pre = 'StoreNotification/';

const initState = {
  detail: {
    toggle: false,
    title: 'Info',
    message: 'Check info!',
    level: 'info',
  },
};

export default function StoreNotification(state = initState, action) {
  switch (action.type) {
    case `${pre}TOGGLE_NOTIFICATION`:
      return { ...state, detail: { toggle: !state.detail.toggle, ...action.data } };
    default:
      return state;
  }
}

export const actionNotification = {
  showNotification(data) {
    return {
      type: `${pre}TOGGLE_NOTIFICATION`,
      data,
    };
  },
};
