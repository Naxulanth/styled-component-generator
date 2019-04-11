import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { ChromePicker } from "react-color";
import Button from "components/Button";
import _ from "lodash/core";

class OptionColor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option]: null,
      optionColor: { r: 50, g: 50, b: 50, a: 1 },
      important: false,
      hide: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = {};
      tempState[this.props.option] = this.state[this.props.option];
      sendData(tempState);
    }
  }

  componentWillUnmount() {
    const { dummy } = this.props;
    if (!dummy) {
      const { sendData } = this.props;
      let tempState = {};
      tempState[this.props.option] = null;
      sendData(tempState);
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
      [this.props.option]: param
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

  render() {
    const { optionColor, hide } = this.state;
    const { option, className } = this.props;
    return (
      <div className={className}>
        <Row className="margin-20">
          <Col className="align-center" lg="12">
            {option}{" "}
            <span className="hide-show" onClick={this.hide}>
              {hide ? "show" : "hide"}
            </span>
          </Col>
        </Row>
        {!hide ? (
          <Fragment>
            <Row>
              <Col className="align-center" lg="12">
                <ChromePicker
                  color={optionColor}
                  onChangeComplete={this.handleChange.bind(this, option)}
                />
              </Col>
            </Row>
            <Row className="margin-20">
              <Col className="align-center" lg="12">
                <Button onClick={this.handleImportant}>important</Button>
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
export default OptionColor;
