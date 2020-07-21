import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LayoutRoute = ({
  component: Component, layout: Layout, appProps, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (!appProps.isAuthenticated
      ? (
        <Layout>
          <Component {...props} {...appProps} />
        </Layout>
      )
      : (
        <Redirect
          to="/"
        />
      )
    )}
  />

);

export default LayoutRoute;
