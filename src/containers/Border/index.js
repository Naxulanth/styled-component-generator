import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";
import "rc-slider/assets/index.css";

class Border extends PureComponent {
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

  handleRadio = e => {
    this.setState({
      "border-style": e.target.value !== "" ? e.target.value : null
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            border-color
          </Col>
        </Row>
        <Option sendData={this.getData} option="border-width" />
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            border-style
          </Col>
        </Row>
        <Row className="margin-20">
          <Col className="align-center" lg="12">
            <input
              onChange={this.handleRadio}
              value="dotted"
              className="align left-10 right-5"
              type="radio"
              checked={this.state["border-style"] === "dotted"}
            />
            <span className="align">dotted</span>
            <input
              onChange={this.handleRadio}
              value="dashed"
              className="align left-10 right-5"
              type="radio"
              checked={this.state["border-style"] === "dashed"}
            />
            <span className="align">dashed</span>
            <input
              onChange={this.handleRadio}
              value="solid"
              className="align left-10 right-5"
              type="radio"
              checked={this.state["border-style"] === "solid"}
            />
            <span className="align">solid</span>
            <input
              onChange={this.handleRadio}
              value="double"
              className="align left-10 right-5"
              type="radio"
              checked={this.state["border-style"] === "double"}
            />
            <span className="align">double</span>
            <input
              onChange={this.handleRadio}
              value={""}
              className="align left-10 right-5"
              type="radio"
              checked={!this.state["border-style"]}
            />
            <span className="align">none</span>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Border;
