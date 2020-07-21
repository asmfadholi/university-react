import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Spinner,
} from 'reactstrap';

export const STATE_LOGIN = 'LOGIN';
// export const STATE_SIGNUP = 'SIGNUP';
export const STATE_FORGOT_PASSWORD = 'FORGOT_PASSWORD';

class AuthForm extends React.Component {
  state = {
    email: 'aa',
    password: '',
  }

  get isLogin() {
    const { props } = this;
    return props.authState === STATE_LOGIN;
  }

  get isForgotPassword() {
    const { props } = this;
    return props.authState === STATE_FORGOT_PASSWORD;
  }

  changeAuthState = (authState) => (event) => {
    event.preventDefault();
    const { props } = this;

    props.onChangeAuthState(authState);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { props } = this;
    props.onSubmit(this.state);
  };

  onChange = (event, name) => {
    const newValue = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  }

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isForgotPassword) {
      return 'Find';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      // confirmPasswordLabel,
      // confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;
    const { state, props } = this;
    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              aria-hidden="true"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={(e) => this.onChange(e, 'email')} value={state.email} />
        </FormGroup>

        {this.isLogin && (
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input {...passwordInputProps} onChange={(e) => this.onChange(e, 'password')} value={state.password} />
          </FormGroup>
        )}

        {this.isLogin && (
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />
              {' '}
              Remember me
            </Label>
          </FormGroup>
        )}

        <hr />
        <Button
          size="lg"
          disabled={props.isFetch}
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}
        >
          { !props.isFetch ? this.renderButtonText() : <Spinner /> }
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isLogin ? (
              <a href="#forgot-password" onClick={this.changeAuthState(STATE_FORGOT_PASSWORD)}>
                Forgot Password?
              </a>
            ) : (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            )}
          </h6>
        </div>
        {children}
      </Form>
    );
  }
}

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_FORGOT_PASSWORD]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  // eslint-disable-next-line
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Emaily',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
