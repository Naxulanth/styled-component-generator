import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";
import { fontStyle, fontWeight } from "constants/options";
import OptionSelect from "containers/OptionSelect";

class Font extends PureComponent {
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
    return (
      <Fragment>
        <Row>
          <Col lg="6">
            <Option sendData={this.getData} option="font-size" />
          </Col>
          <Col lg="6">
            <OptionSelect
              options={fontStyle}
              sendData={this.getData}
              option="font-style"
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Option options={fontWeight} sendData={this.getData} option="font-weight" />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Font;
