import {
  Footer, Header, Content,
} from 'components/Layout';
import { Container } from 'reactstrap';
import React from 'react';

function MainLayout(props) {
  const { children } = props;
  return (
    <main className="cr-app bg-light">
      <Content fluid>
        <Header />
        <Container fluid className="container-home">
          {children}
        </Container>
        <Footer />
      </Content>
    </main>
  );
}

export default MainLayout;
