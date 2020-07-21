import preloadedState from 'utils/preloadedState';

const pre = 'StoreTodo/';

const { StoreTodo: store = {} } = preloadedState;
const { list, detail } = store;

const initState = {
  list: list || [],
  detail: detail || null,
};

export default function StoreTodo(state = initState, action) {
  switch (action.type) {
    case `${pre}LIST_TODO`:
      return { ...state, list: action.data };
    case `${pre}DETAIL_TODO`:
      return { ...state, detail: action.data };
    default:
      return state;
  }
}
