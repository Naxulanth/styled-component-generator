import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import OptionColor from "containers/OptionColor";
import _ from "lodash/core";

class Color extends PureComponent {
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
          <Col className="align-center" lg="6">
            <OptionColor option="color" sendData={this.getData} />
          </Col>
          <Col className="align-center" lg="6">
            <OptionColor option="background" sendData={this.getData} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Color;
