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

class Size extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      "min-height": null,
      "min-width": null,
      "max-height": null,
      "max-width": null,
      px: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      delete tempState["px"];
      sendData(tempState);
    }
  }

  // size

  handle = (key, e) => {
    this.setState({
      [key]: e + (this.state.px ? "px" : "%")
    });
  };

  handlePx = e => {
    this.setState({
      px: !this.state.px
    });
  };

  render() {
    const { px } = this.state;
    return (
      <Fragment>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>width {px ? "(px)" : "(%)"}</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "width")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={500}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>height {px ? "(px)" : "(%)"}</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "height")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>
            min-height {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "min-height")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>
            max-height {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "max-height")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>min-width {px ? "(px)" : "(%)"}</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "min-width")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 4, size: 4 }}>max-width {px ? "(px)" : "(%)"}</Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "max-width")}
              min={0}
              max={px ? 3000 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            <input
              className="align"
              defaultChecked={px}
              onChange={this.handlePx}
              value="px"
              type="checkbox"
            />{" "}
            <span className="align">px</span>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Size;
