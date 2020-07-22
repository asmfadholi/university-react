/* eslint-disable */
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import express from 'express';
import bodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
import store from './stores/index';
import App from './App';
import crud from './utils/crudjson';

require('dotenv').config();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const session = require('express-session');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true },
}));

server.post('/user/forgot-password', ({}, res) => {
  setTimeout(() => {
    res.status(200).send({ error: false });
  }, 1500);
});

server.get('/user/logout', ({ session }, res) => {
  session.token = undefined;
  session.email = undefined;
  session.name = undefined;
  res.status(200).send({ error: false });
});

server.post('/user/register', async ({ body, session }, res) => {
  const dataRes = await crud.createUSer(body);
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    session.token = dataRes.token;
    session.email = dataRes.email;
    session.name = dataRes.name;
    dataRes.token = undefined;
    dataRes.password = undefined;
    res.status(200).send(dataRes);
  }
});

server.post('/user/login', async ({ body, session }, res) => {
  const dataRes = await crud.findUser(body);
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    session.token = dataRes.token;
    session.email = dataRes.email;
    session.name = dataRes.name;
    dataRes.token = undefined;
    dataRes.password = undefined;
    res.status(200).send(dataRes);
  }
});

server.get('/newsletter', async ({}, res) => {
  const dataRes = await crud.findNewsLetterAll();
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    res.status(200).send(dataRes);
  }
});

server.post('/newsletter', async ({body, session}, res) => {

  if (!session.token) return res.status(401).send({ error: true, message: 'You are unauthorized' });
  const user = {
    ...session
  };
  const newReq = { ...body, user };
  const dataRes = await crud.createNewsLetter(newReq);
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    res.status(200).send(dataRes);
  }
});

server.post('/university/favorite', async ({body, session}, res) => {

  if (!session.token) return res.status(401).send({ error: true, message: 'You are unauthorized' });
  const user = {
    ...session
  };
  const newReq = { data: {...body}, user };
  const dataRes = await crud.toggleFavoriteUniversity(newReq);
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    res.status(200).send(dataRes);
  }
});

server.get('/university/favorite', async ({ session}, res) => {

  if (!session.token) return res.status(401).send({ error: true, message: 'You are unauthorized' });
  const user = {
    ...session
  };
  const newReq = { user };
  const dataRes = await crud.listFavoriteUniversity(newReq);
  
  if (dataRes.error) {
    res.status(400).send(dataRes);
  } else {
    res.status(200).send(dataRes);
  }
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};

    const { token, name, email } = req.session;

    if (token) {
      store.dispatch({ type: 'StoreAuth/SET_AUTH', data: { fetch: false, error: false, status: true, name, email }});
    } else {
      store.dispatch({ type: 'StoreAuth/SET_AUTH', data: { fetch: false, error: false, status: false, name: null, email: null }});
    }

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
