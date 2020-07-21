import React from 'react';
import { connect } from 'react-redux';
import { actionAuth } from 'stores/index';

class BlankPage extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.requestLogout();
  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  requestLogout: (props) => dispatch(actionAuth.requestLogout(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlankPage);
