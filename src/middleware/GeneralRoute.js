import React from 'react';
import { Route } from 'react-router-dom';

export default function AuthenticatedRoute({
  component: C, layout: L, appProps, ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (<C {...props} {...appProps} />)}
    />
  );
}
