import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import Slider from "rc-slider";
import _ from "lodash/core";
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";

class Border extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "border-color": null,
      "border-style": null,
      "border-width": null,
      "border-radius": null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState);
    }
  }

  handle = (key, e) => {
    this.setState({
      [key]: e + "px"
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>border-radius</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(
                this,
                "border-radius"
              )}
              min={0}
              max={100}
              defaultValue={0}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col   className="align-center" lg={{ offset: 4, size: 4 }}>border-width</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "border-width")}
              min={0}
              max={100}
              defaultValue={1}
              handle={handle}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Border;