import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Button from "components/Button";
import _ from "lodash/core";
import Option from "containers/Option";
import OptionColor from "containers/OptionColor";
import Select from "react-select";
import { borderStyle } from "constants/options";
import { ChromePicker } from "react-color";
import "rc-slider/assets/index.css";

class Border extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
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

  handleSelect = e => {
    if (!e) {
      e = this.state.selected;
    }
    this.setState({
      selected: e,
      "border-style":
        (e.value !== "" ? e.value : null) +
        (this.state["border-style-important"] ? " !important" : "")
    });
  };

  handleImportant = (key, e) => {
    this.setState(
      {
        [key + "-important"]: !this.state[key + "-important"]
      },
      () => (key === "border-color" ? this.handleChange() : this.handleSelect())
    );
  };

  render() {
    const { color, selected } = this.state;
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            <OptionColor option="border-color" sendData={this.getData} />
          </Col>
          <Col className="align-center vertical-center" lg="6">
            <Option sendData={this.getData} option="border-width" />
            <Option sendData={this.getData} option="border-radius" />
            <Row>
              <Col className="margin-10 align-center" lg="12">
                border-style
              </Col>
            </Row>
            <Row className="margin-10">
              <Col lg="6">
                <Select
                  options={borderStyle}
                  onChange={this.handleSelect}
                  selected={selected}
                />
              </Col>
              <Col className="vertical-center" lg="6">
                <Button
                  onClick={this.handleImportant.bind(this, "border-style")}
                >
                  important
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Border;
