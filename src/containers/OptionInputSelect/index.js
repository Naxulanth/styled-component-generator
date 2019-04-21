import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import WebFont from "webfontloader";
import Button from "components/Button";
import _ from "lodash/core";

class OptionInputSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option + this.props.pseudo]: null,
      important: false,
      hide: false,
      focus: false,
      rawInput: ""
    };
  }

  loadFont = () => {
    this.setState(
      {
        focus: false,
        [this.props.option + this.props.pseudo]:
          (this.state.rawInput ? this.state.rawInput : null) +
          (this.state.important ? " !important" : "")
      },
      WebFont.load({
        google: {
          families: [
            this.state.rawInput + ":100,200,300,400,500,600,700,800,900"
          ]
        }
      })
    );
  };

  focus = () => {
    this.setState({
      focus: true
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState, this.state) && !this.state.focus) {
      const { sendData } = this.props;
      let tempState = {};
      tempState[this.props.option + this.props.pseudo] = this.state[
        this.props.option + this.props.pseudo
      ];
      let tempHiders = {};
      sendData({ tempState, tempHiders });
    }
  }

  handleFamily = e => {
    if (e)
      this.setState({
        rawInput: e && e.target ? e.target.value : this.state.rawInput
      });
  };

  handleNull = () => {
    this.setState({
      [this.props.option + this.props.pseudo]: null,
      rawInput: ""
    });
  };

  handleImportant = () => {
    this.setState(
      {
        important: !this.state.important
      },
      this.handleFamily
    );
  };

  hide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  render() {
    const { option, className, pseudo } = this.props;
    const { hide, rawInput } = this.state;
    return (
      <div className={className}>
        <Row>
          <Col className="align-center" lg={{ offset: 2, size: 5 }}>
            {option}{" "}
            <span className="tooltip-select" data-tip data-for="font-family">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            <ReactTooltip
              id="font-family"
              place="top"
              type="dark"
              effect="float"
            >
              <div style={{ maxWidth: "800px" }}>
                Simply type the name of the font you'd like to choose from
                Google Fonts, and your font will be loaded when you leave focus
                of the textbox!
              </div>
            </ReactTooltip>
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
          <Row className="top-10 margin-10">
            <Col className="align-center vertical-center" lg="6">
              <input
                type="text"
                onBlur={this.loadFont}
                onChange={this.handleFamily}
                style={{ width: "100%", minHeight: "38px" }}
                onFocus={this.focus}
                value={rawInput}
              />
            </Col>
            <Col className="align-center vertical-center" lg="6">
              <Button onClick={this.handleNull} className="align">
                unset
              </Button>
              <Button
                className="align"
                onClick={this.handleImportant.bind(this, option + pseudo)}
              >
                important
              </Button>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}

OptionInputSelect.propTypes = {
  pseudo: PropTypes.string,
  sendData: PropTypes.func,
  option: PropTypes.string
};

export default OptionInputSelect;
