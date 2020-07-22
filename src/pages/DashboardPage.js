import React from 'react';
import imageNewsLetter from 'assets/img/logo/newsletter.png';

import {
  // Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import { connect } from 'react-redux';
import { actionNewsLetter } from 'stores/index';

class DashboardPage extends React.Component {
  componentDidMount() {
    const { props } = this;
    window.scrollTo(0, 0);
    props.requestListNewsLetter();
  }

  render() {
    const { props } = this;
    return (
      <>
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
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchList: state.StoreNewsLetter.listNewsLetter.fetch,
  // isFetchError: state.StoreUniversity.listUniversity.error,
  listData: state.StoreNewsLetter.listNewsLetter.data,
  // reRender: state.StoreUniversity.listUniversity.reRender,
});

const mapDispatchToProps = (dispatch) => ({
  requestListNewsLetter: (req) => dispatch(actionNewsLetter.requestListNewsLetter(req)),
  // showNotification: (req) => dispatch(actionNotification.showNotification(req)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
