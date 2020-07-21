import React from 'react';
import OrgChart from '@unicef/react-org-chart';
import {
  Button,
  // ButtonGroup,
  // Card,
  // CardBody,
  // CardHeader,
  // Col,
  Label,
  Input,
  FormGroup,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  // Row,
} from 'reactstrap';
import { tree } from 'assets/orgchart-data/Tree';
import avatarPersonnel from 'assets/img/users/avatar-personnel.svg';

const initData = {
  person: {
    name: '',
    title: '',
  },
  hasParent: false,
  hasChild: false,
  children: [],
};

class OrgchartPage extends React.Component {
    state = {
      actionData: 'delete',
      modal: false,
      modal_parent: false,
      modal_nested: false,
      currentData: initData,
      temporaryData: initData,
      tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    };

  toggle = (modalType) => () => {
    if (!modalType) {
      return this.setState((prevState) => ({
        modal: !prevState.modal,
      }));
    }

    this.setState((prevState) => ({
      [`modal_${modalType}`]: !prevState[`modal_${modalType}`],
    }));
    return null;
    // if (!modalType) {
    //   return this.setState({
    //     modal: !this.state.modal,
    //   });
    // }

    // this.setState({
    //   [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    // });
  }

  getChild = (id) => id

  getParent = (d) => d

  handleDownload = () => {
    this.setState({ downloadingChart: false });
  }

  handlePerson = (e, d) => {
    // e.person.name = 'iket';
    const { target } = d;
    const { nodeName } = target;

    if (nodeName !== 'text') {
      // e.person.title = 'asdasdasd loker';
      if (!e.children) {
        const children = e._children || [];
        e.children = children;
      } else {
        const { children } = e;
        e._children = children;
        e.children = null;
        // const children = e._children || [];
        // e.children = children;
      }
      this.setState((prevState) => ({
        ...prevState,
        currentData: { person: { ...e.person } },
        temporaryData: e,
      }));
      this.toggle('parent')();
      return true;
    }

    return true;

    // e.person.title = 'asdasdasd loker';
    // if (!e.children) {
    //   const children = e._children || [];
    //   e.children = children;
    // }
    // this.toggle()();
  }

  saveData = () => {
    this.setState((prevState) => {
      const { name, title } = prevState.currentData.person;
      // eslint-disable-next-line
      prevState.temporaryData.person.name = name;
      // eslint-disable-next-line
      prevState.temporaryData.person.title = title;
      return {
        ...prevState,
      };
    });
    this.toggle('nested')();
    this.toggle('parent')();
  }

  deleteData = () => {
    this.setState((prevState) => {
      // const { name, title } = prevState.currentData.person;
      prevState.temporaryData.parent.children.forEach((data, index) => {
        if (data.person.id === prevState.currentData.person.id) {
          prevState.temporaryData.parent.children.splice(index, 1);
          // eslint-disable-next-line
          prevState.temporaryData.parent.person.totalReports--;
        }
      });
      // prevState.temporaryData.person.title = title;
      return {
        ...prevState,
      };
    });
    this.toggle('nested')();
    this.toggle('parent')();
  }

  // changeDom = (data) => {
  //   const { id, name, title } = data.person;
  //   // const { name, title } = person;
  //   console.log('hayuk', data);
  //   const element = document.getElementById(`image-${id}`).parentNode;
  //   element.children[2].innerHTML = name;
  //   element.children[3].innerHTML = title;
  // }

  handleOnChangeConfig = (config) => {
    // console.log('jess', config);
    this.setState({ config });
  }

  onChange = (event, name) => {
    const newValue = event.target.value;
    if (newValue.length < 25) {
      this.setState((prevState) => {
        // eslint-disable-next-line
        prevState.currentData.person[name] = newValue;
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

  handleLoadConfig = () => {
    const { config } = this.state;
    return config;
  }

  confirmAction = (action) => () => {
    this.setState((preState) => ({
      ...preState,
      modeData: action,
    }));
    this.toggle('nested')();
  }

  render() {
    const {
      // eslint-disable-next-line
      tree, downloadingChart, modal_parent, modal_nested, modeData,
    } = this.state;
    const { props, state } = this;
    // const yes = false;
    // For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image';
    const downloadPdfId = 'download-pdf';

    return (
      <>
        <div className="zoom-buttons">
          <button
            type="button"
            className="btn btn-outline-primary zoom-button"
            id="zoom-in"
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-outline-primary zoom-button"
            id="zoom-out"
          >
            -
          </button>
        </div>
        {/* eslint-disable-next-line */}
        { !modal_parent && (
        <OrgChart
          tree={tree}
          downloadImageId={downloadImageId}
          downloadPdfId={downloadPdfId}
          onConfigChange={(config) => {
            this.handleOnChangeConfig(config);
          }}
          loadConfig={(d) => {
            const configuration = this.handleLoadConfig(d);
            if (configuration) {
              return configuration;
            }
            return null;
          }}
          onPersonClick={(d, check) => {
            const configuration = this.handlePerson(d, check);
            if (configuration) {
              return configuration;
            }
            return null;
          }}
          downlowdedOrgChart={(d) => {
            this.handleDownload(d);
          }}
          loadImage={() => Promise.resolve(avatarPersonnel)}
          loadParent={(d) => {
            const parentData = this.getParent(d);
            return parentData;
          }}
          loadChildren={(d) => {
            const childrenData = this.getChild(d.id);
            return childrenData;
          }}
        />
        ) }

        <Modal
          // eslint-disable-next-line
          isOpen={modal_parent}
          toggle={this.toggle('parent')}
          className={props.className}
        >
          <ModalHeader toggle={this.toggle('parent')}>Detail profile</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={(e) => this.onChange(e, 'name')}
                  value={state.currentData.person.name}
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Jabatan</Label>
                <Input
                  type="text"
                  name="title"
                  onChange={(e) => this.onChange(e, 'title')}
                  value={state.currentData.person.title}
                  placeholder="Jabatan"
                />
              </FormGroup>
            </Form>

            <Modal
              // eslint-disable-next-line
              isOpen={modal_nested}
              toggle={this.toggle('nested')}
            >
              <ModalHeader>
                Are you sure to
                {' '}
                {modeData}
                {' '}
                profile data?
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle('nested')}>
                  Cancel
                </Button>
                {' '}
                <Button
                  color="secondary"
                  onClick={modeData === 'Delete' ? this.deleteData : this.saveData}
                >
                  Yes
                </Button>
              </ModalFooter>
            </Modal>

          </ModalBody>
          <ModalFooter>

            { state.temporaryData.hasParent && (
            <Button color="danger" onClick={this.confirmAction('Delete')}>
              Delete
            </Button>
            ) }

            <Button color="primary" onClick={this.confirmAction('Edit')}>
              Save
            </Button>
            {' '}
            <Button color="secondary" onClick={this.toggle('parent')}>
              Cancel
            </Button>

          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default OrgchartPage;
