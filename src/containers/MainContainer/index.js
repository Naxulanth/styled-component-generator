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
import classnames from "classnames";
import { toast } from "react-toastify";
import Size from "containers/Size";
import Border from "containers/Border";
import { handle } from "components/Handle";
import { components } from "constants/components";

import "rc-slider/assets/index.css";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        margin: "0 auto"
      },
      styled: "",
      css: "",
      Component: null,
      selected: null,
      name: "MyComponent",
      activeTab: null,
      inputText: "Test",
      selectComponents: []
    };
    this.cssArea = React.createRef();
    this.styledArea = React.createRef();
  }

  componentDidMount() {
    let tempComponents = components.slice(0);
    tempComponents = tempComponents.map(component => {
      component.label += " - " + component.type;
      return component;
    });
    this.setState({
      selectComponents: tempComponents
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!_.isEqual(prevState.params, this.state.params) ||
        !_.isEqual(prevState.selected, this.state.selected) ||
        this.state.name !== prevState.name) &&
      this.state.selected
    ) {
      this.generateComponent();
    }
  }

  getData = data => {
    const { params } = this.state;
    let merged = { ...params, ...data };
    this.setState({
      params: merged
    });
  };

  generateComponent = () => {
    const { selected, params, name } = this.state;
    Object.keys(params).forEach(
      key =>
        (params[key] == null ||
          (key !== "margin" && parseInt(params[key]) === 0)) &&
        delete params[key]
    );
    let label =
      selected.type === "core"
        ? '"' + selected.label.split(" -")[0] + '"'
        : selected.label.split(" -")[0];
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
    let styledString = `const ${name} = styled(${label})\`
${paramString}\n\`

export default ${name};
`;
    let cssString = `.${name} {
${paramString}
}`;
    this.setState({
      Component: c,
      styled: styledString,
      css: cssString
    });
  };

  // inputs

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
    if (e.target.classList[1].includes("styled")) {
      this.styledArea.current.select();
    } else this.cssArea.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Copied to clipboard!");
  };

  // tabs

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    const {
      styled,
      css,
      Component,
      params,
      name,
      selected,
      inputText,
      selectComponents,
      activeTab
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg={{ offset: 2, size: 8 }}>
            <Row className="margin-20">
              <Col className="vertical-center" lg={{ offset: 2, size: 4 }}>
                <span>Component</span>
              </Col>
              <Col lg={{ size: 4 }}>
                <Select
                  options={selectComponents}
                  value={selected}
                  onChange={this.handleSelect}
                  placeholder={"Select component..."}
                />
              </Col>
            </Row>
            <Row className="margin-20">
              <Col className="vertical-center" lg={{ offset: 2, size: 4 }}>
                <span>Component/Class Name</span>
              </Col>
              <Col className="input-container align-center" lg={{ size: 4 }}>
                <input
                  className="full-width"
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
                        active: activeTab === "1"
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
                        active: activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Size
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Border sendData={this.getData} />
              </TabPane>
            </TabContent>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="2">
                <Size sendData={this.getData} />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        {activeTab !== null ? (
          <Row className="margin-20">
            <Col className="vertical-center align-center" lg="12">
              <span>Tip: You can use arrow keys to move the sliders.</span>
            </Col>
            >
          </Row>
        ) : null}
        <Row className="margin-20">
          <Col className="align-center" lg="12">
            {Component ? <Component>{inputText}</Component> : null}
          </Col>
        </Row>
        <Row>
          <Col className="align-center" lg={{ offset: 2, size: 8 }}>
            <Row>
              <Col lg="6">
                <textarea
                  ref={this.styledArea}
                  onClick={this.handleCopy}
                  readOnly
                  className="code-area styled-area"
                  value={styled}
                />
                <Row>
                  <Col lg="12">Styled</Col>
                </Row>
              </Col>
              <Col lg="6">
                <textarea
                  ref={this.cssArea}
                  onClick={this.handleCopy}
                  readOnly
                  className="code-area css-area"
                  value={css}
                />
                <Row>
                  <Col lg="12">CSS</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainContainer;
