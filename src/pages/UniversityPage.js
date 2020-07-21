// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
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
import React from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   MdBubbleChart,
//   MdInsertChart,
//   MdPersonPin,
//   MdPieChart,
//   MdRateReview,
//   MdShare,
//   MdShowChart,
//   MdThumbUp,
// } from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardDeck,
//   CardGroup,
//   CardHeader,
//   CardTitle,
//   Col,
//   ListGroup,
//   ListGroupItem,
//   Row,
// } from 'reactstrap';
// import { getColor } from 'utils/colors';
import { connect } from 'react-redux';
import { actionNotification } from 'stores/index';
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
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    // setTimeout(() => {
    //   if (!this.notificationSystem) {
    //     return;
    //   }

    // const { error } = NOTIFICATION_OPTIONS.topRight;
    // error.message = 'walau badai menghadang tak apa!';
    // this.props.showNotification(error);

    //   this.notificationSystem.addNotification({
    //     title: '<MdLoyalty />',
    //     message:
    //       'baskir',
    //     level: 'info',
    //   });
    // }, 2500);
  }

  render() {
    // const primaryColor = getColor('primary');
    // const secondaryColor = getColor('secondary');
    // const user = resource.user.read();
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        University
      </Page>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  showNotification: (req) => dispatch(actionNotification.showNotification(req)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
