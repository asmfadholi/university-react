import logo200Image from 'assets/img/logo/user-logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Spinner,
} from 'reactstrap';

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';
// export const STATE_FORGOT_PASSWORD = 'FORGOT_PASSWORD';

class AuthForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  get isLogin() {
    const { props } = this;
    return props.authState === STATE_LOGIN;
  }

  get isSignup() {
    const { props } = this;
    return props.authState === STATE_SIGNUP;
  }

  // get isForgotPassword() {
  //   const { props } = this;
  //   return props.authState === STATE_FORGOT_PASSWORD;
  // }

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

    if (!buttonText && this.isSignup) {
      return 'Register';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      nameLabel,
      nameInputProps,
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

        {this.isSignup && (
          <FormGroup>
            <Label for={nameLabel}>{nameLabel}</Label>
            <Input {...nameInputProps} onChange={(e) => this.onChange(e, 'name')} value={state.name} />
          </FormGroup>
        )}

        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={(e) => this.onChange(e, 'email')} value={state.email} />
        </FormGroup>

        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange={(e) => this.onChange(e, 'password')} value={state.password} />
        </FormGroup>

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
              <a href="#forgot-password" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Register?
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
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  nameLabel: PropTypes.string,
  nameInputProps: PropTypes.object,
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
  nameLabel: 'Name',
  nameInputProps: {
    type: 'text',
    placeholder: 'your name',
  },
  usernameLabel: 'Email',
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
