import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import styled from "styled-components";
import _ from "lodash/core";
import "./style.css";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      code: "",
      Component: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.params, this.state.params)) {
      console.log("ye");
      this.generateComponent();
    }
  }

  generateComponent = () => {
    this.setState({
      Component: styled(Button)`
        width: auto;
      `
    });
  };

  handleClick = () => {
    this.setState({
      params: { test: "test" }
    });
  };

  render() {
    const { code, Component, params } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick}>test</Button>
        <Row>
          <Col lg="12">{Component ? <Component>Test</Component> : null}</Col>
        </Row>
        <Row>
          <Col lg="12">
            <textarea className="code-area" defaultValue={code} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainContainer;
