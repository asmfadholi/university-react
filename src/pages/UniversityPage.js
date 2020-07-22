import buildingLogo from 'assets/img/logo/building.jpg';
import React from 'react';
import SearchInput from 'components/SearchInput';
import imageSearch from 'assets/img/logo/search.png';
import Skeleton from 'react-loading-skeleton';

import {
  Card,
  Modal,
  ModalHeader,
  Spinner,
  ModalFooter,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Col,
  CardImg,
  Row,
} from 'reactstrap';

import { connect } from 'react-redux';
import { actionUniversity } from 'stores/index';

class DashboardPage extends React.Component {
  state = {
    inputCountry: 'ghana',
    inputUniversity: 'and',
    modal: false,
    currentUniversity: null,
    currentIndex: 0,
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.requestSearchUniversity();
  }

  toggle = () => () => {
    this.setState((prevState) => ({
      ...prevState,
      modal: !prevState.modal,
    }));
  }

  saveTemporaryData = (data, index) => {
    this.setState((prevState) => ({
      ...prevState,
      currentUniversity: data,
      currentIndex: index,
    }));
  }

  saveData = () => {
    const { props, state } = this;

    props.requestAddFavoriteUniversity(state.currentUniversity, state.currentIndex);
    this.toggle()();
  }

  requestSearchUniversity = () => {
    const { props, state } = this;
    const req = {
      name: state.inputUniversity,
      country: state.inputCountry,
    };
    props.requestListUniversity(req);
  }

  onChange = (newValue, name) => {
    this.setState((prevState) => ({
      ...prevState,
      [`input${name}`]: newValue,
    }));
  }

  render() {
    const { props, state } = this;
    return (
      <>
        <div className="d-flex align-content-center justify-content-center search-field">
          <SearchInput
            placeholder="University"
            onChange={this.onChange}
            value={state.inputUniversity}
            onSubmit={this.requestSearchUniversity}
          />
          <SearchInput
            placeholder="Country"
            onChange={this.onChange}
            value={state.inputCountry}
            onSubmit={this.requestSearchUniversity}
          />
          <Button onClick={this.requestSearchUniversity}>Search</Button>
        </div>

        <br />
        <Row className="university-page">
          {props.listData && props.listData.map((data, index) => (

            <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={index}>
              <Card>
                <CardImg
                  top
                  src={buildingLogo}
                  onClick={() => {
                    if (props.isLogin) {
                      const { isLove = false } = data;
                      // eslint-disable-next-line
                      data.isLove = isLove;
                      this.toggle()();
                      this.saveTemporaryData(data, index);
                    }
                  }}
                />
                <CardBody>
                  <CardTitle>{data.name}</CardTitle>
                  <CardText>
                    {data.country}
                    <br />
                    <a href={data.web_pages} target="_blank" rel="noreferrer">
                      <Button
                        size="lg"
                        color="primary"
                        block
                      >
                        Website
                      </Button>
                    </a>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}

          { props.isFetchList && [1, 2, 3, 4].map((data) => (
            <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={data}>
              <Skeleton height={500} />
            </Col>

          )) }

          { (!props.isFetchList && props.listData.length === 0) && (
            <Col lg={12} className="d-flex justify-content-center">
              <div>
                <img src={imageSearch} alt="data not found" />
                <br />
                <p className="text-center">
                  Oops,
                  {' '}
                  { props.isFetchError ? 'something went wrong' : 'data is not found'}
                </p>
              </div>

            </Col>

          ) }

        </Row>

        <Modal
          isOpen={state.modal}
          toggle={this.toggle()}
        >
          <ModalHeader>
            Do you want to save
            {' '}
            <b>
              {state.currentUniversity && state.currentUniversity.name}
            </b>
            {' '}
            as favorite ?
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle()}>
              Cancel
            </Button>
            {' '}
            <Button
              color="secondary"
              onClick={this.saveData}
            >
              { !props.isFetchList ? 'Yes' : <Spinner /> }
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchList: state.StoreUniversity.listUniversity.fetch,
  isFetchError: state.StoreUniversity.listUniversity.error,
  listData: state.StoreUniversity.listUniversity.data,
  reRender: state.StoreUniversity.listUniversity.reRender,
  isLogin: state.StoreAuth.isLogin.status,
});

const mapDispatchToProps = (dispatch) => ({
  requestListUniversity: (req) => dispatch(actionUniversity.requestListUniversity(req)),
  requestAddFavoriteUniversity: (req, index) => {
    dispatch(actionUniversity.requestAddFavoriteUniversity(req, index));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
