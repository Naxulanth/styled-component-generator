import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";

class Size extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = data => {
    const { sendData } = this.props;
      sendData(data);
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col lg="6">
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="width" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="min-width" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="max-width" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option sendData={this.getData} option="line-height" />
              </Col>
            </Row>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="height" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="min-height" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="max-height" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Size;
