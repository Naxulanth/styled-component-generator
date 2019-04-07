import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Slider from "rc-slider";
import _ from "lodash/core";
import Button from "components/Button";
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option]: "",
      px: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      delete tempState["px"];
      sendData(tempState);
    }
  }

  handle = (key, e) => {
    this.setState({
      [this.props.option]: e + (this.state.px ? "px" : "%")
    });
  };

  handlePx = e => {
    this.setState({
      px: !this.state.px
    });
  };

  handleAuto = e => {
    this.setState({
      [this.props.option]: "auto"
    });
  };

  render() {
    const { px } = this.state;
    const { option } = this.props;
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            {option} {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20 vertical-center-items">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, option)}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={500}
              handle={handle}
            />
          </Col>
          <Col lg="4">
            <Button onClick={this.handleAuto} className="align">
              auto
            </Button>
            <Button onClick={this.handlePx} className="align">
              {px ? "%" : "px"}
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Option;
