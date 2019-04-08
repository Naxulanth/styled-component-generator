import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { ChromePicker } from "react-color";
import Button from "components/Button";
import _ from "lodash/core";

class OptionColor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      color: "#333",
      important: false,
      params: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState.params);
    }
  }

  handleChange = (key, e) => {
    const { option } = this.props;
    if (!e) {
      e = {};
      e.rgb = Object.assign({}, this.state.color);
    }
    let tempParams = {};
    tempParams[option] =
      `rgba(${e.rgb.r}@ ${e.rgb.g}@ ${e.rgb.b}@ ${e.rgb.a})` +
      (this.state.important ? " !important" : "");
    this.setState({
      color: e.rgb,
      params: tempParams
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
    const { color } = this.state;
    const { option } = this.props;
    return (
      <Fragment>
        <Row className="margin-20">
          <Col className="align-center" lg="12">
            {option}
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg="12">
            <ChromePicker
              color={color}
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
    );
  }
}
export default OptionColor;
