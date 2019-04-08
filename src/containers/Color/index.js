import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import OptionColor from "containers/OptionColor";
import _ from "lodash/core";

class Color extends PureComponent {
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
    let merged = { ...this.state.params, ...data };
    this.setState(merged);
  };

  render() {
    const { color, background } = this.state;
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
