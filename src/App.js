import { STATE_LOGIN, STATE_FORGOT_PASSWORD } from 'components/AuthForm';
import { EmptyLayout, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import PropTypes from 'utils/propTypes';
import componentQueries from 'react-component-queries';
import { Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import NotificationSystem from 'react-notification-system';
import './styles/reduction.scss';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const BlankPage = React.lazy(() => import('./pages/BlankPage'));
const AuthPage = React.lazy(() => import('pages/AuthPage'));

// middleware
const AuthenticatedRoute = React.lazy(() => import('./middleware/AuthenticatedRoute'));
const UnauthenticatedRoute = React.lazy(() => import('./middleware/UnauthenticatedRoute'));

class App extends React.Component {
  componentDidUpdate(prevProps) {
    this.isShowNotification(prevProps);
  }

  isShowNotification = (prevProps) => {
    if (!this.notificationSystem) {
      return;
    }
    const { props } = this;
    if (prevProps.StoreNotification.toggle !== props.StoreNotification.toggle) {
      this.notificationSystem.addNotification(props.StoreNotification);
    }
  }

  render() {
    const { props } = this;
    const Layout = props.isAuthenticated ? MainLayout : EmptyLayout;
    return (
      <>
        <Switch>
          <Layout breakpoint={props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <AuthenticatedRoute
                exact
                path="/"
                component={DashboardPage}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />
              <AuthenticatedRoute
                exact
                path="/logout"
                component={BlankPage}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />
              <UnauthenticatedRoute
                exact
                path="/login"
                component={AuthPage}
                authState={STATE_LOGIN}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />

              <UnauthenticatedRoute
                exact
                path="/forgot-password"
                component={AuthPage}
                authState={STATE_FORGOT_PASSWORD}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />

            </React.Suspense>
          </Layout>
          <Redirect to="/" />

        </Switch>
        <NotificationSystem
          dismissible={false}
          // eslint-disable-next-line
          ref={(notificationSystem) => (this.notificationSystem = notificationSystem)}
          style={NOTIFICATION_SYSTEM_STYLE}
        />
      </>
    );
  }
}

App.propTypes = {
  breakpoint: PropTypes.string,
};

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (width > 576 && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (width > 768 && width < 991) {
    return { breakpoint: 'md' };
  }

  if (width > 992 && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.StoreAuth.isLogin.status,
  StoreNotification: state.StoreNotification.detail,
});

const mapDispatchToProps = () => ({});

export default componentQueries(query)(connect(mapStateToProps, mapDispatchToProps)(App));
