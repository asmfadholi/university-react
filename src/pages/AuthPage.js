import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { actionAuth } from 'stores/index';

const propsForm = {
  login: {
    usernameLabel: 'Email',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
  },
  signUp: {
    nameLabel: 'Name',
    usernameLabel: 'Email',
    usernameInputProps: {
      type: 'email',
      placeholder: 'your@email.com',
    },
  },
};
class AuthPage extends React.Component {
  get propsForm() {
    const { login, signUp } = propsForm;
    const { props } = this;
    return props.authState === STATE_LOGIN ? login : signUp;
  }

  get isFetch() {
    const { isFetchLogin, isFetchForgotPassword, authState } = this.props;
    return authState === STATE_LOGIN ? isFetchLogin : isFetchForgotPassword;
  }

  handleAuthState = (authState) => {
    if (authState === STATE_LOGIN) {
      const { props } = this;
      props.history.push('/login');
    } else {
      const { props } = this;
      props.history.push('/register');
    }
  };

  handleLogoClick = () => {
    const { props } = this;
    props.history.push('/');
  };

  onSubmit = (state) => {
    const { props } = this;
    if (props.authState === STATE_LOGIN) {
      const { email, password } = state;
      props.requestLogin({ email, password });
    } else {
      const { name, email, password } = state;
      props.requestRegister({ name, email, password });
    }
  };

  render() {
    const { usernameLabel, usernameInputProps } = this.propsForm;
    const { props } = this;
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              isFetch={this.isFetch}
              usernameLabel={usernameLabel}
              usernameInputProps={usernameInputProps}
              authState={props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
              onSubmit={this.onSubmit}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchLogin: state.StoreAuth.isLogin.fetch,
  isFetchForgotPassword: state.StoreAuth.isEmailExist.fetch,
  isLogin: state.StoreAuth.isLogin.status,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (req) => dispatch(actionAuth.requestLogin(req)),
  requestForgotPassword: (req) => dispatch(actionAuth.requestForgotPassword(req)),
  requestRegister: (req) => dispatch(actionAuth.requestRegister(req)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
