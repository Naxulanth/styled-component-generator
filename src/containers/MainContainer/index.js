import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import styled from "styled-components";
import _ from "lodash/core";
import Select from "react-select";
import { toast } from "react-toastify";
import { components } from "constants/components";
import "./style.css";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        width: null,
        height: null,
        border: null,
        "border-radius": null
      },
      code: "",
      Component: null,
      selected: null,
      name: ""
    };
    this.textArea = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.params, this.state.params)) {
      this.generateComponent();
    }
  }

  generateComponent = () => {
    const { selected } = this.state;
    let label = selected.type === "core" ? '"' + selected.label + '"' : selected.label;
    let c = styled(selected.value)`
      width: auto;
    `;
    let cString = `styled(${label})\`
      width: auto;
      \``;
    this.setState({
      Component: c,
      code: cString
    });
  };

  handleClick = () => {
    this.setState({
      params: { test: "test" }
    });
  };

  handleName = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      selected: e
    });
  };

  handleCopy = e => {
    this.textArea.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Copied to clipboard!");
  };

  render() {
    const { code, Component, params, name, selected } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick}>test</Button>
        <Row className="margin-10">
          <Col md="4" lg="4">
            <span>Component Name</span>
          </Col>
          <Col className="input-container" md="8" lg="8">
            <input value={name} onChange={this.handleName} type="text" />
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Select
              options={components}
              value={selected}
              onChange={this.handleSelect}
              placeholder={"Select component..."}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="12">{Component ? <Component>Test</Component> : null}</Col>
        </Row>
        <Row>
          <Col lg="12">
            <textarea
              ref={this.textArea}
              onClick={this.handleCopy}
              readOnly
              className="code-area"
              value={code}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainContainer;
