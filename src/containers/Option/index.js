import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import Slider from "rc-slider";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash/core";
import Button from "components/Button";
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option + this.props.pseudo]: null,
      px: true,
      important: false,
      hide: false
    };
  }

  componentDidMount() {
    const { data, hide } = this.props;
    if (data) {
      this.setState({
        [this.props.option + this.props.pseudo]: data,
        px: data.includes("px"),
        important: data.includes("important")
      });
    }
    if (hide) {
      this.setState({
        hide: hide
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dummy } = this.props;
    if (!_.isEqual(prevState, this.state) && !dummy) {
      const { sendData } = this.props;
      let tempState = {};
      tempState[this.props.option + this.props.pseudo] = this.state[
        this.props.option + this.props.pseudo
      ];
      let tempHiders = {};
      sendData({ tempState, tempHiders });
    }
  }

  handle = (key, e) => {
    const { noPx } = this.props;
    if (!e) {
      e = parseInt(this.state[this.props.option + this.props.pseudo]);
    }
    this.setState({
      [this.props.option + this.props.pseudo]:
        e +
        (noPx ? "" : this.state.px ? "px" : "%") +
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
      [this.props.option + this.props.pseudo]:
        "auto" + (this.state.important ? " !important" : "")
    });
  };

  handleNull = () => {
    this.setState({
      [this.props.option + this.props.pseudo]: null
    });
  };

  handleInput = e => {
    const { noPx } = this.props;
    if (e.target.value === "") {
      this.setState({
        [this.props.option + this.props.pseudo]: null
      });
    } else
      this.setState({
        [this.props.option + this.props.pseudo]:
          e.target.value.replace(/\D/, "") +
          (noPx ? "" : this.state.px ? "px" : "%") +
          (this.state.important ? " !important" : "")
      });
  };

  hide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  handleImportant = () => {
    if (this.state[this.props.option + this.props.pseudo])
      this.setState(
        {
          important: !this.state.important
        },
        this.state[this.props.option + this.props.pseudo].includes("auto")
          ? this.handleAuto
          : this.handle
      );
  };

  render() {
    const { px, hide } = this.state;
    const {
      option,
      min,
      max,
      pxOption,
      noPx,
      step,
      className,
      pseudo
    } = this.props;
    return (
      <div className={className}>
        <Row>
          <Col
            className={"align-center" + (!hide ? " margin-10" : "")}
            lg={{ offset: 2, size: 5 }}
          >
            {option} {noPx ? "" : px ? "(px)" : "(%)"}{" "}
          </Col>
          <Col lg="4">
            <span className="hide-show" onClick={this.hide}>
              {hide ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
          </Col>
        </Row>
        {!hide ? (
          <Row className="margin-20 vertical-center-items">
            <Col lg="2">
              <input
                type="number"
                className="number-input"
                value={
                  parseInt(this.state[option + pseudo]) ||
                  parseInt(this.state[option + pseudo]) === 0
                    ? parseInt(this.state[option + pseudo])
                    : ""
                }
                onChange={this.handleInput}
                placeholder={
                  this.state[option + pseudo] === "auto" ? "auto" : "unset"
                }
              />
            </Col>
            <Col lg="4">
              <Slider
                onChange={this.handle.bind(this, option + pseudo)}
                min={noPx ? min : px ? (min ? min : 0) : 0}
                max={noPx ? max : px ? (max ? max : 2000) : 100}
                step={noPx ? step : px ? 10 : 1}
                value={
                  noPx
                    ? isNaN(parseInt(this.state[option + pseudo]))
                      ? min
                      : parseInt(this.state[option + pseudo])
                    : parseInt(this.state[option + pseudo])
                }
                handle={handle}
              />
            </Col>
            <Col className="align-center vertical-center" lg="6">
              {noPx ? (
                ""
              ) : (
                <Button onClick={this.handleAuto} className="align">
                  auto
                </Button>
              )}
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
        ) : (
          ""
        )}
      </div>
    );
  }
}

Option.propTypes = {
  data: PropTypes.string,
  pseudo: PropTypes.string,
  sendData: PropTypes.func,
  option: PropTypes.string
};


export default Option;
