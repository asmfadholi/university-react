import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import { EmptyLayout, MainLayout, LayoutRoute } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import PropTypes from 'utils/propTypes';
import componentQueries from 'react-component-queries';
import { Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';
import NotificationSystem from 'react-notification-system';
import './styles/reduction.scss';
import AuthPage from 'pages/AuthPage';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const UniversityPage = React.lazy(() => import('./pages/UniversityPage'));
const FavoritePage = React.lazy(() => import('pages/FavoritePage'));

// middleware
const AuthenticatedRoute = React.lazy(() => import('./middleware/AuthenticatedRoute'));
const GeneralRoute = React.lazy(() => import('./middleware/GeneralRoute'));

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
    const Layout = MainLayout;
    return (
      <>
        <Switch>
          <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            appProps={{
              isAuthenticated: props.isAuthenticated,
            }}
            component={(propss) => (
              <AuthPage {...propss} authState={STATE_LOGIN} />
            )}
          />
          <LayoutRoute
            exact
            path="/register"
            layout={EmptyLayout}
            appProps={{
              isAuthenticated: props.isAuthenticated,
            }}
            component={(propss) => (
              <AuthPage {...propss} authState={STATE_SIGNUP} />
            )}
          />

          <Layout breakpoint={props.breakpoint} isAuthenticated={props.isAuthenticated}>
            <React.Suspense fallback={<PageSpinner />}>
              <GeneralRoute
                exact
                path="/"
                component={DashboardPage}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />

              <GeneralRoute
                exact
                path="/university"
                component={UniversityPage}
                appProps={{
                  isAuthenticated: props.isAuthenticated,
                }}
              />

              <AuthenticatedRoute
                exact
                path="/favorite"
                component={FavoritePage}
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
