import React, { PureComponent, Fragment } from "react";
import {Row, Col} from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";

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
          </Row>
      </Fragment>
    );
  }
}
export default Font;
