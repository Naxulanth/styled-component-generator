import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { ChromePicker } from "react-color";
import Button from "components/Button";
import _ from "lodash/core";

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#333",
      background: "#333",
      params: {
        color: null,
        background: null
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState.params);
    }
  }

  getData = data => {
    let merged = { ...this.state.params, ...data };
    this.setState(merged);
  };

  handleChange = (key, e) => {
    console.log(key);
    console.log(e);
    let tempParams = Object.assign({}, this.state.params);
    tempParams[key] = `rgba(${e.rgb.r}@ ${e.rgb.g}@ ${e.rgb.b}@ ${e.rgb.a})`;
    this.setState({
      [key]: e.rgb,
      params: tempParams
    });
    console.log(this.state);
  };

  handleImportant = (key, e) => {
    let tempParams = Object.assign({}, this.state.params);
    if (tempParams[key]) {
      let importantIndex = tempParams[key].indexOf(" !important");
      if (importantIndex > 0) {
        tempParams[key] = tempParams[key].substr(0, importantIndex);
      } else tempParams[key] += " !important";
    }
    this.setState({
      params: tempParams
    });
  };

  render() {
    const { color, background } = this.state;
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            background
          </Col>
          <Col className="align-center" lg="6">
            color
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg="6">
            <ChromePicker
              color={background}
              onChangeComplete={this.handleChange.bind(this, "background")}
            />
          </Col>
          <Col className="align-center" lg="6">
            <ChromePicker
              color={color}
              onChangeComplete={this.handleChange.bind(this, "color")}
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col className="align-center" lg="6">
            <Button onClick={this.handleImportant.bind(this, "background")}>
              important
            </Button>
          </Col>
          <Col className="align-center" lg="6">
            <Button onClick={this.handleImportant.bind(this, "color")}>
              important
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Color;
