import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

class AuthModal extends React.Component {
  state = {
    show: true,
    authState: STATE_LOGIN,
  };

  toggle = () => {
    this.setState((prevState) => ({
      ...prevState,
      show: !prevState.show,
    }));
  };

  handleAuthState = (authState) => {
    this.setState({
      authState,
    });
  };

  render() {
    const { state } = this;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Login
        </Button>
        <Modal
          isOpen={state.show}
          toggle={this.toggle}
          size="sm"
          fade={false}
          centered
        >
          <ModalBody>
            <AuthForm
              authState={state.authState}
              onChangeAuthState={this.handleAuthState}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AuthModal;
