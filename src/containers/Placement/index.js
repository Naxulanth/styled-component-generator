import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";

class Placement extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState);
    }
  }

  getData = data => {
    let merged = { ...this.state, ...data };
    this.setState(merged);
  };

  render() {
    const { px } = this.state;
    return (
      <Fragment>
        <Row>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="padding-left" />
          </Col>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="padding-right" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="padding-top" />
          </Col>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="padding-bottom" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="margin-top" />
          </Col>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="margin-bottom" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="margin-left" />
          </Col>
          <Col lg="6">
          <Option pxOption sendData={this.getData} option="margin-right" />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Placement;
