import buildingLogo from 'assets/img/logo/building.jpg';
import React from 'react';
import imageSearch from 'assets/img/logo/search.png';
import Skeleton from 'react-loading-skeleton';

import {
  MdFavorite,
} from 'react-icons/md';

import {
  Card,
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
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    const { props } = this;
    window.scrollTo(0, 0);
    props.requestListFavoriteUniversity();
  }

  render() {
    const { props } = this;
    return (
      <>
        <Row className="university-page">
          {props.listData && props.listData.map((data, index) => (

            <Col lg={3} md={4} sm={6} xs={12} className="mb-3" key={index}>
              <Card>
                <span className="favorite-button">
                  <MdFavorite
                    className={data.isLove ? 'love-tag' : ''}
                    onClick={() => {
                      if (!props.isLogin) {
                        props.history.push('/login?redirect=/university');
                      } else {
                        props.toggleFavoriteList(index);
                      }
                    }}
                  />
                </span>
                <CardImg top src={buildingLogo} />
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

      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchList: state.StoreUniversity.listFavoriteUniversity.fetch,
  isFetchError: state.StoreUniversity.listFavoriteUniversity.error,
  listData: state.StoreUniversity.listFavoriteUniversity.data,
  reRender: state.StoreUniversity.listFavoriteUniversity.reRender,
  isLogin: state.StoreAuth.isLogin.status,
});

const mapDispatchToProps = (dispatch) => ({
  requestListUniversity: (req) => dispatch(actionUniversity.requestListUniversity(req)),
  requestListFavoriteUniversity: () => {
    dispatch(actionUniversity.requestListFavoriteUniversity());
  },
  toggleFavoriteList: (req) => dispatch(actionUniversity.receiveData(req, 'SET_FAVORITE_UNIVERSITY')),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
