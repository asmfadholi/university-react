// eslint-disable-next-line
let preloadedState = {};

if (process.browser) {
  preloadedState = window.__PRELOADED_STATE__;
}
export default preloadedState;
