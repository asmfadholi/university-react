// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
// import Page from 'components/Page';
// import ProductMedia from 'components/ProductMedia';
// import SupportTicket from 'components/SupportTicket';
// import UserProgressTable from 'components/UserProgressTable';
// import { IconWidget, NumberWidget } from 'components/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
// import {
//   avatarsData,
//   chartjs,
//   productsData,
//   supportTicketsData,
//   todosData,
//   userProgressTableData,
// } from 'demos/dashboardPage';
import buildingLogo from 'assets/img/logo/building.jpg';
import React from 'react';
import SearchInput from 'components/SearchInput';
import imageSearch from 'assets/img/logo/search.png';
import Skeleton from 'react-loading-skeleton';

// import { Bar, Line } from 'react-chartjs-2';
import {
  MdFavorite,
} from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
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
// import { getColor } from 'utils/colors';
import { connect } from 'react-redux';
import { actionUniversity } from 'stores/index';
// import { NOTIFICATION_OPTIONS } from 'utils/constants';
// import { fetchProfileData } from './fakeApi';

// const resource = fetchProfileData();

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );

class DashboardPage extends React.Component {
  state = {
    inputCountry: 'ghana',
    inputUniversity: 'and',
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.requestSearchUniversity();
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
                <span className="favorite-button">
                  <MdFavorite className={data.isLove ? 'love-tag' : ''} onClick={() => props.toggleFavoriteList(index)} />

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
  isFetchList: state.StoreUniversity.listUniversity.fetch,
  isFetchError: state.StoreUniversity.listUniversity.error,
  listData: state.StoreUniversity.listUniversity.data,
  reRender: state.StoreUniversity.listUniversity.reRender,
});

const mapDispatchToProps = (dispatch) => ({
  requestListUniversity: (req) => dispatch(actionUniversity.requestListUniversity(req)),
  toggleFavoriteList: (req) => dispatch(actionUniversity.receiveData(req, 'SET_FAVORITE_UNIVERSITY')),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
