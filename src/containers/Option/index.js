import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Slider from "rc-slider";
import _ from "lodash/core";
import Button from "components/Button";
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option]: null,
      px: true,
      important: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      delete tempState["px"];
      delete tempState["important"];
      sendData(tempState);
    }
  }

  handle = (key, e) => {
    if (!e) {
      e = parseInt(this.state[this.props.option]);
    }
    this.setState({
      [this.props.option]:
        e +
        (this.state.px ? "px" : "%") +
        (this.state.important ? " !important" : "")
    });
  };

  handlePx = () => {
    this.setState({
      px: !this.state.px
    });
  };

  handleAuto = () => {
    this.setState({
      [this.props.option]: "auto" + (this.state.important ? " !important" : "")
    });
  };

  handleNull = () => {
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

  handleImportant = () => {
    if (this.state[this.props.option])
      this.setState(
        {
          important: !this.state.important
        },
        this.state[this.props.option].includes("auto")
          ? this.handleAuto
          : this.handle
      );
  };

  render() {
    const { px } = this.state;
    const { option, min, max, pxOption } = this.props;
    return (
      <Fragment>
        <Row className="margin-20">
          <Col className="align-center" lg={"12"}>
            {option} {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20 vertical-center-items">
          <Col lg="2">
            <input
              type="number"
              className="number-input"
              value={
                parseInt(this.state[option]) ||
                parseInt(this.state[option]) === 0
                  ? parseInt(this.state[option])
                  : ""
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
              step={px ? 5 : 1}
              defaultValue={0}
              value={parseInt(this.state[option])}
              handle={handle}
            />
          </Col>
          <Col lg="6">
            <Button onClick={this.handleAuto} className="align">
              auto
            </Button>
            {pxOption ? (
              <Button onClick={this.handlePx} className="align">
                {px ? "%" : "px"}
              </Button>
            ) : null}
            <Button onClick={this.handleNull} className="align">
              unset
            </Button>
            <Button onClick={this.handleImportant}>important</Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Option;
