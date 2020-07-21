import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import express from 'express';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
import store from './stores/index';
import App from './App';

require('dotenv').config();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const session = require('express-session');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true },
}));

server.post('/user/login', ({ session }, res) => {
  session.token = true;
  setTimeout(() => {
    res.status(200).send({ error: false });
  }, 1500);
});

server.post('/user/forgot-password', ({}, res) => {
  // session.token = true;
  setTimeout(() => {
    res.status(200).send({ error: false });
  }, 1500);
});

server.get('/user/logout', ({ session }, res) => {
  session.token = undefined;
  res.status(200).send({ error: false });
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};

    const { token } = req.session;

    if (token) {
      store.dispatch({ type: 'StoreAuth/SET_AUTH', data: { fetch: false, error: false, status: true } });
    } else {
      store.dispatch({ type: 'StoreAuth/SET_AUTH', data: { fetch: false, error: false, status: false } });
    }

    console.log(store.getState(), req.session);

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    const preloadedState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="This is an example of a meta description. This will often show up in search results."></head>
        ${
  assets.client.css
    ? `<link rel="stylesheet" href="${assets.client.css}">`
    : ''
}
        ${
  process.env.NODE_ENV === 'production'
    ? `<script src="${assets.client.js}" defer></script>`
    : `<script src="${assets.client.js}" defer crossorigin></script>`
}
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c',
  )}
        </script>
    </body>
</html>`,
      );
    }
  });

export default server;
