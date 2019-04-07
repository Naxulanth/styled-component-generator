import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";

class Size extends PureComponent {
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
    const { sendData } = this.props;
    let merged = { ...this.state, ...data };
    this.setState(merged);
  };

  render() {
    const { px } = this.state;
    return (
      <Fragment>
        <Row>
          <Col lg="6">
            <Option sendData={this.getData} option="width" />
          </Col>
          <Col lg="6">
            <Option sendData={this.getData} option="height" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Option sendData={this.getData} option="min-width" />
          </Col>
          <Col lg="6">
            <Option sendData={this.getData} option="min-height" />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Option sendData={this.getData} option="max-width" />
          </Col>
          <Col lg="6">
            <Option sendData={this.getData} option="max-height" />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Size;
