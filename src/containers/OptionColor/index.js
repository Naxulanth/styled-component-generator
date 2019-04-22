import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import Button from "components/Button";
import _ from "lodash/core";

class OptionColor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option + this.props.pseudo]: null,
      optionColor: { r: 50, g: 50, b: 50, a: 1 },
      important: false,
      hide: false
    };
  }

  componentDidMount() {
    const { data, hide } = this.props;
    if (data) {
      let colorSplit = data.split("(")[1].split("@");
      this.setState({
        [this.props.option + this.props.pseudo]: data,
        important: data ? data.includes("important") : false,
        optionColor: {
          r: colorSplit[0],
          g: colorSplit[1],
          b: colorSplit[2],
          a: colorSplit[3].split(")")[0]
        }
      });
    }
    if (hide) {
      this.setState({
        hide: hide
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dummy, pseudo, option } = this.props;
    let data = this.props.data
    if (!data) data = this.state[option + pseudo]
    if (prevProps.pseudo !== pseudo) {
      let colorSplit = data ? data.split("(")[1].split("@") : null;
      this.setState({
        important: data ? data.includes("important") : false,
        optionColor: data
          ? {
              r: colorSplit[0],
              g: colorSplit[1],
              b: colorSplit[2],
              a: colorSplit[3].split(")")[0]
            }
          : { r: 50, g: 50, b: 50, a: 1 }
      });
    }
    if (!_.isEqual(prevState, this.state) && !dummy) {
      const { sendData } = this.props;
      let tempState = {};
      tempState[this.props.option + this.props.pseudo] = this.state[
        this.props.option + this.props.pseudo
      ];
      let tempHiders = {};
      tempHiders[this.props.option + this.props.pseudo] = this.state.hide;
      sendData({ tempState, tempHiders });
    }
  }

  hide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  handleChange = (key, e) => {
    if (!e) {
      e = {};
      e.rgb = Object.assign({}, this.state.optionColor);
    }
    let param =
      `rgba(${e.rgb.r}@ ${e.rgb.g}@ ${e.rgb.b}@ ${e.rgb.a})` +
      (this.state.important ? " !important" : "");
    this.setState({
      optionColor: e.rgb,
      [this.props.option + this.props.pseudo]: param
    });
  };

  handleImportant = () => {
    this.setState(
      {
        important: !this.state.important
      },
      this.handleChange
    );
  };

  handleNull = () => {
    this.setState({
      [this.props.option + this.props.pseudo]: null
    });
  };

  render() {
    const { optionColor, hide } = this.state;
    const { option, className, pseudo } = this.props;
    return (
      <div className={className}>
        <Row>
          <Col className="align-center" lg={{ offset: 2, size: 8 }}>
            {option}{" "}
          </Col>
          <Col lg="2">
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
          <Fragment>
            <Row>
              <Col className="align-center" lg={{ offset: 2, size: 8 }}>
                <ChromePicker
                  color={optionColor}
                  onChangeComplete={this.handleChange.bind(
                    this,
                    option + pseudo
                  )}
                />
              </Col>
            </Row>
            <Row className="margin-20">
              <Col className="align-center" lg={{ offset: 2, size: 8 }}>
                <Button onClick={this.handleNull} className="align">
                  unset
                </Button>
                <Button className="align" onClick={this.handleImportant}>important</Button>
              </Col>
            </Row>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

OptionColor.propTypes = {
  data: PropTypes.string,
  pseudo: PropTypes.string,
  sendData: PropTypes.func,
  option: PropTypes.string
};

export default OptionColor;
