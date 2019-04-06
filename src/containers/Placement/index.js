import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import Slider from "rc-slider";
import _ from "lodash/core";
import Button from "components/Button"
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";

class Placement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "padding-left": null,
      "padding-right": null,
      "padding-top": null,
      "padding-bottom": null,
      "margin-top": null,
      "margin-bottom": null,
      "margin-left": null,
      "margin-right": null,
      px: false
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

  handleAuto = e => {
      console.log(e.target.value)
    this.setState({
      [e.target.value]: "auto"
    });
  }


  render() {
    const { px } = this.state;
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            padding-left {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "padding-left")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            padding-right {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "padding-right")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            padding-top {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "padding-top")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            padding-bottom {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "padding-bottom")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            margin-left {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="vertical-center-items margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "margin-left")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
          <Col lg="2">
          <Button value="margin-left" onClick={this.handleAuto} className="align">auto</Button>
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            margin-right {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "margin-right")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            margin-top {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "margin-top")}
              min={0}
              max={px ? 500 : 100}
              defaultValue={25}
              handle={handle}
            />
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            margin-bottom {px ? "(px)" : "(%)"}
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "margin-bottom")}
              min={0}
              max={px ? 500 : 100}
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
export default Placement;
