import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const search = props.location.search ? props.location.search.split('/')[1] : '';
        return !appProps.isAuthenticated
          ? <C {...props} {...appProps} {...rest} />
          : <Redirect to={`/${search}`} />;
      }}
    />
  );
}
