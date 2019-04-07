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
      [this.props.option]: "unset",
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

  handleNull = e => {
    this.setState({
      [this.props.option]: null
    });
  };

  handleInput = e => {
    if (e.target.value === "") {
      this.setState({
        [this.props.option]: null
      });
    } else
      this.setState({
        [this.props.option]:
          e.target.value.replace(/\D/, "") + (this.state.px ? "px" : "%")
      });
  };

  render() {
    const { px } = this.state;
    const { option, min, max } = this.props;
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            {option} {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20 vertical-center-items">
          <Col lg={{ offset: 3, size: 1 }}>
            <input
              type="number"
              className="number-input"
              value={
                parseInt(this.state[option]) ? parseInt(this.state[option]) : ""
              }
              onChange={this.handleInput}
              placeholder={this.state[option] === "auto" ? "auto" : "unset"}
            />
          </Col>
          <Col lg="4">
            <Slider
              onChange={this.handle.bind(this, option)}
              min={px ? (min ? min : 0) : 0}
              max={px ? (max ? max : 2000) : 100}
              step={px ? 10 : 1}
              defaultValue={0}
              value={parseInt(this.state[option])}
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
            <Button onClick={this.handleNull} className="align">
              unset
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Option;
