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
import styled from "styled-components";
import _ from "lodash/core";
import Select from "react-select";
import Slider from "rc-slider";
import { handle } from "components/Handle";
import "rc-slider/assets/index.css";
import { toast } from "react-toastify";
import { components } from "constants/components";
import classnames from "classnames";
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
      name: "",
      activeTab: null,
      inputText: "Test"
    };
    this.textArea = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(prevState.params, this.state.params) ||
      !_.isEqual(prevState.selected, this.state.selected) ||
      this.state.name !== prevState.name
    ) {
      this.generateComponent();
    }
  }

  generateComponent = () => {
    const { selected, params, name } = this.state;
    Object.keys(params).forEach(
      key => params[key] == null && delete params[key]
    );
    let label =
      selected.type === "core" ? '"' + selected.label + '"' : selected.label;
    let c = styled(selected.value)`
      ${params}
    `;
    let paramString =
      Object.keys(params).length > 0
        ? JSON.stringify(params)
            .replace("{", "")
            .replace("}", "")
            .replace(/"/g, "")
            .replace(/,/g, ";\n")
            .replace(/:/g, ": ") + ";"
        : "";
    let cString = `const ${name} = styled(${label})\`
${paramString}\n\`

export default ${name};
`;
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
    let activeTab = !this.state.selected ? "1" : this.state.activeTab;
    this.setState({
      activeTab,
      selected: e
    });
  };

  handleInput = e => {
    this.setState({
      inputText: e.target.value
    });
  };

  handleCopy = e => {
    this.textArea.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Copied to clipboard!");
  };

  handleBorderRadius = e => {
    let tempParams = Object.assign({}, this.state.params);
    tempParams["border-radius"] = e + "px";
    this.setState({
      params: tempParams
    });
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const { code, Component, params, name, selected, inputText } = this.state;
    return (
      <div>
        <Row className="margin-20">
          <Col className="vertical-center" lg={{ offset: 2, size: 4 }}>
            <span>Component</span>
          </Col>
          <Col lg={{ size: 4 }}>
            <Select
              options={components}
              value={selected}
              onChange={this.handleSelect}
              placeholder={"Select component..."}
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col className="vertical-center" lg={{ offset: 2, size: 4 }}>
            <span>Component Name</span>
          </Col>
          <Col className="input-container align-center" lg={{ size: 4 }}>
            <input
              className="full-width"
              disabled={!selected}
              value={name}
              onChange={this.handleName}
              type="text"
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col className="vertical-center" lg={{ offset: 2, size: 4 }}>
            <span>Input text</span>
          </Col>
          <Col className="input-container align-center" lg={{ size: 4 }}>
            <input
              className="full-width"
              value={inputText}
              onChange={this.handleInput}
              type="text"
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg="12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Border
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Color
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col lg={{ offset: 4, size: 4 }}>border-radius</Col>
            </Row>
            <Row className="margin-20">
              <Col lg={{ offset: 4, size: 4 }}>
                <Slider
                  onChange={this.handleBorderRadius}
                  value={parseInt(params["border-radius"])}
                  min={0}
                  max={100}
                  defaultValue={0}
                  handle={handle}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <Row className="margin-20">
          <Col lg="12">
            {Component ? <Component>{inputText}</Component> : null}
          </Col>
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
