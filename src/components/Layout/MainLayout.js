import {
  Content, Footer, Header, Sidebar,
} from 'components/Layout';
import React from 'react';
// import {
//   MdImportantDevices,
//   // MdCardGiftcard,
//   MdLoyalty,
// } from 'react-icons/md';
// import NotificationSystem from 'react-notification-system';
// import { connect } from 'react-redux';
// import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  // componentDidUpdate(prevProps) {
  //   this.isShowNotification(prevProps);
  //   if (!this.notificationSystem) {
  //     return;
  //   }
  // }

  componentDidMount() {
    const { breakpoint } = this.props;
    this.checkBreakpoint(breakpoint);
  }

  // eslint-disable-next-line
  componentWillReceiveProps({ breakpoint }) {
    const { props } = this;
    if (breakpoint !== props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  // isShowNotification = (prevProps) => {
  //   if (!this.notificationSystem) {
  //     return;
  //   }

  //   if (prevProps.StoreNotification.toggle !== this.props.StoreNotification.toggle) {
  //     this.notificationSystem.addNotification(this.props.StoreNotification);
  //   }
  // }

  // close sidebar when
  handleContentClick = () => {
    // close sidebar if sidebar is open and screen size is less than `md`
    const { props } = this;
    if (
      MainLayout.isSidebarOpen()
      && (props.breakpoint === 'xs'
        || props.breakpoint === 'sm'
        || props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint = (breakpoint) => {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  };

  openSidebar = (openOrClose) => {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
    return null;
  }

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          {children}
          <Footer />
        </Content>

        { /* <NotificationSystem
          dismissible={false}
          ref={notificationSystem =>
            (this.notificationSystem = notificationSystem)
          }
          style={NOTIFICATION_SYSTEM_STYLE}
        /> */ }
      </main>
    );
  }
}

// const mapStateToProps = (state) => {
//   return { StoreNotification: state.StoreNotification.detail };
// }

// const mapDispatchToProps = () => {
//   return {};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
export default MainLayout;
