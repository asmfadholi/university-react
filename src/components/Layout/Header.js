import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import React from 'react';
import {
  MdExitToApp,
  MdHome,
  MdAccountBalance,
  MdFavorite,
} from 'react-icons/md';
import {
  ListGroup,
  ListGroupItem,
  NavbarToggler,
  Collapse,
  Nav,
  Button,
  Modal,
  ModalHeader,
  Spinner,
  ModalFooter,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import bn from 'utils/bemnames';
import { connect } from 'react-redux';
import { actionAuth } from 'stores/index';

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    isToggleNavbar: true,
    modal: false,
  };

  toggle = (modalType) => () => {
    if (!modalType) {
      this.setState((prevState) => ({
        ...prevState,
        modal: !prevState.modal,
      }));
    }
  }

  checkActive = (match, location) => {
    // some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    return pathname === '/';
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      ...prevState,
      isToggleNavbar: !prevState.isToggleNavbar,
    }));
  }

  toggleUserCardPopover = () => {
    this.setState((prevState) => ({
      ...prevState,
      isOpenUserCardPopover: !prevState.isOpenUserCardPopover,
    }));
  }

  requestLogout = () => {
    this.toggle()();
    this.toggleNavbar();
    const { props } = this;
    props.requestLogout();
  }

  render() {
    const { state, props } = this;
    return (
      <Navbar expand="md" light className={bem.b('bg-white')}>

        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!state.isToggleNavbar} navbar>
          <Nav navbar>
            <NavItem>
              <BSNavLink tag={NavLink} isActive={this.checkActive} to="/">
                <MdHome className="mr-2" />
                Home
              </BSNavLink>
            </NavItem>
            <NavItem>
              <BSNavLink tag={NavLink} to="/university">
                <MdAccountBalance className="mr-2" />
                University
              </BSNavLink>
            </NavItem>
            { props.isLogin ? (
              <>
                <NavItem>
                  <BSNavLink tag={NavLink} to="/favorite">
                    <MdFavorite className="mr-2" />
                    Favorite
                  </BSNavLink>
                </NavItem>

                <NavItem className="signout-breakpoint" onClick={this.toggle()}>
                  <BSNavLink>
                    <MdExitToApp className="mr-2" />
                    Sign out
                  </BSNavLink>
                </NavItem>
              </>
            ) : (
              <NavItem className="signout-breakpoint">
                <BSNavLink tag={NavLink} to="/login">
                  <MdExitToApp className="mr-2" />
                  Sign in
                </BSNavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>

        <Nav navbar className={`${bem.e('nav-right')} profile-navbar`}>
          { props.isLogin ? (
            <NavItem>
              <BSNavLink id="Popover2">
                <Avatar
                  onClick={this.toggleUserCardPopover}
                  className="can-click"
                />
              </BSNavLink>
              <Popover
                placement="bottom-end"
                isOpen={state.isOpenUserCardPopover}
                toggle={this.toggleUserCardPopover}
                target="Popover2"
                className="p-0 border-0"
                style={{ minWidth: 250 }}
              >
                <PopoverBody className="p-0 border-light">
                  <UserCard
                    title="Jane"
                    subtitle="jane@jane.com"
                    text="Last updated 3 mins ago"
                    className="border-light"
                  >
                    <ListGroup flush>

                      <ListGroupItem onClick={this.toggle()} action className="border-light">
                        <MdExitToApp />
                        {' '}
                        Sign Out
                      </ListGroupItem>

                    </ListGroup>
                  </UserCard>
                </PopoverBody>
              </Popover>
            </NavItem>
          ) : (
            <NavItem>
              <BSNavLink tag={NavLink} to="/login">
                <MdExitToApp className="mr-2" />
                Sign in
              </BSNavLink>
            </NavItem>
          ) }

        </Nav>
        <Modal
          isOpen={state.modal}
          toggle={this.toggle()}
        >
          <ModalHeader>
            Are you sure you want to log out ?
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle()}>
              Cancel
            </Button>
            {' '}
            <Button
              color="secondary"
              disabled={props.isFetchLogout}
              onClick={this.requestLogout}
            >
              { !props.isFetchLogout ? 'Yes' : <Spinner /> }
            </Button>
          </ModalFooter>
        </Modal>

      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchLogout: state.StoreAuth.isLogin.fetch,
  isLogin: state.StoreAuth.isLogin.status,
});

const mapDispatchToProps = (dispatch) => ({
  requestLogout: (props) => dispatch(actionAuth.requestLogout(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
