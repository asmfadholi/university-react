import React from 'react';
import imageNewsLetter from 'assets/img/logo/newsletter.png';

import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  ModalFooter,
  Form,
  Spinner,
  FormGroup,
  Row,
} from 'reactstrap';
import {
  MdPlusOne,
} from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { actionNewsLetter } from 'stores/index';

class DashboardPage extends React.Component {
  state = {
    modal_parent: false,
    modal_nested: false,
    message: '',
    title: '',
  }

  componentDidMount() {
    const { props } = this;
    window.scrollTo(0, 0);
    props.requestListNewsLetter();
  }

  toggle = (modalType) => () => {
    this.setState((prevState) => ({
      [`modal_${modalType}`]: !prevState[`modal_${modalType}`],
    }));
  }

  triggerAddNewsLetter = () => {
    const { props } = this;
    if (!props.isLogin) {
      props.history.push('/login');
    } else {
      this.toggle('parent')();
    }
  }

  onChange = (event, name) => {
    const newValue = event.target.value;
    if (newValue.length < 30) {
      this.setState((prevState) => {
        // eslint-disable-next-line
        prevState[name] = newValue;
        return {
          ...prevState,
        };
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
      }));
    }
  }

  saveData = () => {
    const { props, state } = this;
    this.setState((prevState) => ({
      ...prevState,
      title: '',
      message: '',
    }));
    const req = {
      title: state.title,
      message: state.message,
      user: {
        name: props.currentUser,
      },
    };
    props.requestCreateNewsLetter(req);
    this.toggle('nested')();
    this.toggle('parent')();
  }

  render() {
    const { props, state } = this;
    return (
      <>
        <Button
          color="primary"
          className="mb-3"
          onClick={this.triggerAddNewsLetter}
        >
          <MdPlusOne className="mr-2" />
          Create Newsletter
        </Button>
        <Row>
          {props.listData && props.listData.map((data, index) => (

            <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={index}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h3>
                      #
                      {' '}
                      {data.title}
                    </h3>
                    <p>
                      by:
                      {' '}
                      {data.user && data.user.name}
                    </p>
                  </CardTitle>
                  <CardText>

                    {data.message}

                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}

          { props.isFetchList && [1, 2, 3, 4].map((data) => (
            <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={data}>
              <Skeleton height={200} />
            </Col>

          )) }

          { (!props.isFetchList && props.listData.length === 0) && (
          <Col lg={12} className="d-flex justify-content-center">
            <div>
              <img src={imageNewsLetter} alt="data not found" />
              <br />
              <p className="text-center">
                Oops,
                {' '}
                { props.isFetchError ? 'something went wrong' : 'There is no newsletter'}
              </p>
            </div>

          </Col>

          ) }

        </Row>
        <Modal
          isOpen={state.modal_parent}
          toggle={this.toggle()}
        >
          <ModalHeader>
            Create Newsletter
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  onChange={(e) => this.onChange(e, 'title')}
                  value={state.title}
                  placeholder="Title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="message">Message</Label>
                <Input
                  type="textarea"
                  name="message"
                  onChange={(e) => this.onChange(e, 'message')}
                  value={state.message}
                  placeholder="Message"
                />
              </FormGroup>
            </Form>

            <Modal
              // eslint-disable-next-line
              isOpen={state.modal_nested}
              toggle={this.toggle('nested')}
            >
              <ModalHeader>
                Are you sure you want to create this Newsletter ?
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle('nested')}>
                  Cancel
                </Button>
                {' '}
                <Button
                  color="secondary"
                  onClick={this.saveData}
                >
                  { !props.isFetchLogout ? 'Yes' : <Spinner /> }
                </Button>
              </ModalFooter>
            </Modal>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle('parent')}>
              Cancel
            </Button>
            {' '}
            <Button
              color="secondary"
              onClick={this.toggle('nested')}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.StoreAuth.isLogin.name,
  isFetchList: state.StoreNewsLetter.listNewsLetter.fetch,
  // isFetchError: state.StoreUniversity.listUniversity.error,
  listData: state.StoreNewsLetter.listNewsLetter.data,
  isLogin: state.StoreAuth.isLogin.status,
  // reRender: state.StoreUniversity.listUniversity.reRender,
});

const mapDispatchToProps = (dispatch) => ({
  requestListNewsLetter: (req) => dispatch(actionNewsLetter.requestListNewsLetter(req)),
  requestCreateNewsLetter: (req) => dispatch(actionNewsLetter.requestCreateNewsLetter(req)),
  // showNotification: (req) => dispatch(actionNotification.showNotification(req)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
