import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { register } from 'razzle-plugin-workbox/service-worker';
import { Provider } from 'react-redux';

import store from 'stores/index';
import App from './App';

const getBasename = () => `/${process.env.RAZZLE_RUNTIME_PUBLIC_URL.split('/').pop()}`;

hydrate(
  <Provider store={store}>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}

register();
