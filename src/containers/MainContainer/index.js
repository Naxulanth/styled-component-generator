import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import _ from "lodash/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import Select from "react-select";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Customizer from "containers/Customizer";
import { components } from "constants/components";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      styled: "",
      css: "",
      Component: null,
      selected: null,
      name: "MyComponent",
      inputText: "Test",
      selectComponents: [],
      testBackground: "#eaeeee",
      testBackgroundState: "",
      splitParams: {
        hover: {},
        disabled: {},
        focus: {},
        "": {}
      }
    };
    this.cssArea = React.createRef();
    this.styledArea = React.createRef();
  }

  componentDidMount() {
    this.fixComponents();
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

  fixComponents = () => {
    let tempComponents = components.slice(0);
    tempComponents = tempComponents.map(component => {
      component.label += " - " + component.type;
      return component;
    });
    this.setState({
      selectComponents: tempComponents
    });
  };

  getData = data => {
    // check if hover in name to sort into different objects?
    // custom sends object rest send string
    const { params } = this.state;
    let merged = { ...params, ...data };
    this.setState({
      params: merged
    });
  };

  generateComponent = () => {
    const { selected, params, name, splitParams } = this.state;
    let tempParams = Object.assign({}, params);
    let tempSplitParams = Object.assign({}, splitParams);
    Object.keys(tempParams).forEach(key => {
      if (
        tempParams[key] == null ||
        (typeof tempParams[key] === "string" &&
          tempParams[key].includes("null"))
      ) {
        delete tempParams[key];
      } else {
        Object.keys(tempSplitParams).forEach(splitKey => {
          if (splitKey !== "" && key.includes(splitKey)) {
            tempSplitParams[splitKey][key.substr(0, key.lastIndexOf("-"))] =
              tempParams[key];
            delete tempParams[key];
          }
        });
      }
      tempSplitParams[""] = tempParams;
    });
    let label =
      selected.type === "core"
        ? '"' + selected.label.split(" -")[0] + '"'
        : selected.label.split(" -")[0];
    let c = styled(selected.value)`
      ${JSON.parse(JSON.stringify(params).replace(/@/g, ","))}
    `;
    let paramString =
      Object.keys(params).length > 0
        ? JSON.stringify(params)
            .replace("{", "")
            .replace("}", "")
            .replace(/"/g, "")
            .replace(/,/g, ";\n")
            .replace(/:/g, ": ")
            .replace(/@/g, ",") + ";"
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
    this.setState({
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

  handleBackdrop = e => {
    this.setState({
      testBackgroundState: e.rgb,
      testBackground: `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`
    });
  };

  render() {
    const {
      styled,
      css,
      Component,
      name,
      selected,
      inputText,
      selectComponents,
      testBackground,
      testBackgroundState,
      params
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg={{ offset: 2, size: 8 }}>
            <Row>
              <Col className="vertical-center" lg={{ size: 12 }}>
                <span>
                  <span className="title">Select</span>
                  <span className="tooltip-select" data-tip="tooltip-select">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </span>
                </span>
                <ReactTooltip place="top" type="dark" effect="float">
                  ...
                </ReactTooltip>
              </Col>
            </Row>
            <Row>
              <Col className="top-20" lg="6">
                <Row className="margin-20">
                  <Col className="vertical-center" lg={{ size: 6 }}>
                    <span>Component</span>
                  </Col>
                  <Col lg={{ size: 6 }}>
                    <Select
                      options={selectComponents}
                      value={selected}
                      onChange={this.handleSelect}
                      placeholder={"Select component..."}
                    />
                  </Col>
                </Row>
                <Row className="margin-20">
                  <Col className="vertical-center" lg={{ size: 6 }}>
                    <span>Component/Class Name</span>
                  </Col>
                  <Col
                    className="input-container align-center"
                    lg={{ size: 6 }}
                  >
                    <input
                      className="full-width"
                      value={name}
                      onChange={this.handleName}
                      type="text"
                    />
                  </Col>
                </Row>
                <Row className="margin-20">
                  <Col className="vertical-center" lg={{ size: 6 }}>
                    <span>Input text</span>
                  </Col>
                  <Col
                    className="input-container align-center"
                    lg={{ size: 6 }}
                  >
                    <input
                      className="full-width"
                      value={inputText}
                      onChange={this.handleInput}
                      type="text"
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg="6">
                <Row className="margin-20">
                  <Col
                    className="align-center vertical-center"
                    lg={{ size: 12 }}
                  >
                    <ChromePicker
                      onChangeComplete={this.handleBackdrop}
                      color={testBackgroundState}
                    />
                    <Row>
                      <Col lg="12">
                        <span>Backdrop color</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="margin-20" lg={{ size: 12 }}>
                <span>
                  <span className="title">Customize</span>
                  <span className="tooltip-select" data-tip="tooltip-select">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </span>
                </span>
                <ReactTooltip place="top" type="dark" effect="float">
                  ...
                </ReactTooltip>
              </Col>
            </Row>
            <Customizer
              sendData={this.getData}
              params={params}
              selected={selected}
            />
          </Col>
        </Row>
        {Component ? (
          <Row>
            <Col className="top-20 margin-20" lg={{ offset: 2, size: 10 }}>
              <span>
                <span className="title">Preview</span>
                <span className="tooltip-select" data-tip="tooltip-select">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </span>
              <ReactTooltip place="top" type="dark" effect="float">
                ...
              </ReactTooltip>
            </Col>
          </Row>
        ) : null}
        <Row className="margin-20">
          <Col
            style={{
              background: testBackground
            }}
            className="align-center"
            lg="12"
          >
            {Component ? <Component>{inputText}</Component> : null}
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 2, size: 10 }}>
            <span>
              <span className="title">Copy</span>
              <span className="tooltip-select" data-tip="tooltip-select">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </span>
            <ReactTooltip place="top" type="dark" effect="float">
              ...
            </ReactTooltip>
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
