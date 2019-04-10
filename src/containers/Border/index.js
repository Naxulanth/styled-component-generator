import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash/core";
import Option from "containers/Option";
import OptionColor from "containers/OptionColor";
import OptionSelect from "containers/OptionSelect";

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

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            <OptionColor option="border-color" sendData={this.getData} />
          </Col>
          <Col className="align-center vertical-center" lg="6">
            <Option sendData={this.getData} option="border-width" />
            <Option sendData={this.getData} option="border-radius" />
            <OptionSelect sendData={this.getData} option="border-style" />
            <Row />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Border;
