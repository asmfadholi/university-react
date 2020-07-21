import {
  Footer, Header,
} from 'components/Layout';
import { Container } from 'reactstrap';
import React from 'react';

function MainLayout(props) {
  const { children } = props;
  return (
    <main className="cr-app bg-light">
      <Container fluid>
        <Header />
        {children}
        <Footer />
      </Container>
    </main>
  );
}

export default MainLayout;
