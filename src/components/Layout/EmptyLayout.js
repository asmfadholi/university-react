import { Content } from 'components/Layout';
import React from 'react';

const EmptyLayout = ({ children }) => (
  <main className="cr-app bg-light">
    <Content fluid>{children}</Content>
  </main>
);

export default EmptyLayout;
