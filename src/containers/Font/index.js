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

class Font extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "font-size": null
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
      [key]: e + "px"
    });
  };

  render() {
    const { px } = this.state;
    return (
      <Fragment>
        {" "}
        <Row>
          <Col className="align-center" lg={{ offset: 4, size: 4 }}>
            font-size
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg={{ offset: 4, size: 4 }}>
            <Slider
              onAfterChange={this.handle.bind(this, "font-size")}
              min={0}
              max={100}
              defaultValue={14}
              handle={handle}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Font;
