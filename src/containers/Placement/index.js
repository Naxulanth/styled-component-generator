import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";

class Placement extends PureComponent {
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
                <Option
                  pxOption
                  sendData={this.getData}
                  option="padding-left"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  pxOption
                  sendData={this.getData}
                  option="padding-right"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="padding-top" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  pxOption
                  sendData={this.getData}
                  option="padding-bottom"
                />
              </Col>
            </Row>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="12">
                <Option
                  pxOption
                  sendData={this.getData}
                  option="margin-left"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  pxOption
                  sendData={this.getData}
                  option="margin-right"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option pxOption sendData={this.getData} option="margin-top" />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  pxOption
                  sendData={this.getData}
                  option="margin-bottom"
                />
              </Col>
            </Row>
          </Col>
          </Row>
      </Fragment>
    );
  }
}
export default Placement;
