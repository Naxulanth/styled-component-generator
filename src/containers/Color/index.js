import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import _ from "lodash/core";

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
        background: null,
        color: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState);
    }
  }

  handle = (key, e) => {
    this.setState({
      [key]: e
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            background
          </Col>
        </Row>
        <Row className="margin-20">
        <Col className="align-center" lg={{ offset: 4, size: 4 }}>
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            color
          </Col>
        </Row>
        <Row className="margin-20">
        <Col className="align-center" lg={{ offset: 4, size: 4 }}>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Color;
