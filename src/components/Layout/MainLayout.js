import {
  Content, Footer, Header, Sidebar,
} from 'components/Layout';
import { Container } from 'reactstrap';
import React from 'react';
// import {
//   MdImportantDevices,
//   // MdCardGiftcard,
//   MdLoyalty,
// } from 'react-icons/md';
// import NotificationSystem from 'react-notification-system';
// import { connect } from 'react-redux';
// import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

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

// const mapStateToProps = (state) => {
//   return { StoreNotification: state.StoreNotification.detail };
// }

// const mapDispatchToProps = () => {
//   return {};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
export default MainLayout;
