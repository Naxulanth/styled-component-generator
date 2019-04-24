import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import styled from "styled-components";
import _ from "lodash/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";
import { prefix } from "constants/fontawesome";
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
      nochildren: false,
      identifier: "",
      identifierSubmit: faQuestionCircle,
      identifierFocus: false,
      name: "MyComponent",
      inputText: "Test",
      selectComponents: [],
      testBackground: "#eaeeee",
      testBackgroundState: "",
      splitParams: {
        "": {},
        hover: {},
        disabled: {},
        focus: {}
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
      !this.state.identifierFocus &&
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
    Object.keys(tempSplitParams).forEach(key => {
      let tempParams = tempSplitParams[key];
      tempSplitParams[key] =
        Object.keys(tempParams).length > 0
          ? JSON.stringify(tempParams)
              .replace("{", "")
              .replace("}", "")
              .replace(/"/g, "")
              .replace(/,/g, ";\n")
              .replace(/:/g, ": ")
              .replace(/@/g, ",") + ";"
          : "";
    });
    let styledInner = Object.keys(tempSplitParams)
      .map(tempParams => {
        if (tempSplitParams[tempParams].length > 0)
          return `${tempParams === "" ? "" : "&:" + tempParams} ${
            tempParams === "" ? "" : "{"
          }
${tempSplitParams[tempParams]}
${tempParams === "" ? "" : "}"}`;
        else return null;
      })
      .join("");

    let styledString = `const ${name} = styled(${label})\` ${styledInner} \n\`
export default ${name};
`;

    let cssString = Object.keys(tempSplitParams)
      .map(tempParams => {
        if (tempSplitParams[tempParams].length > 0)
          return `.${name}${tempParams === "" ? "" : ":"}${tempParams} {
${tempSplitParams[tempParams]}
}\n`;
        else return null;
      })
      .join("");
    let c = styled(selected.value)`
      ${styledInner}
    `;
    this.setState({
      Component: c,
      styled: styledString,
      css: cssString,
      nochildren: selected.nochildren
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

  handleIdentifier = e => {
    this.setState({
      identifier: e.target.value
    });
  };

  submitIdentifier = e => {
    if (this.state.identifier.split(" ")[1]) {
      let imported = null;
      this.setState({
        identifierFocus: false
      });
      let submit = this.state.identifier.split(" ");
      let pre = prefix[submit[0]];
      let icon = submit[1]
        .split("-")
        .slice(1)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");
      let result = "fa" + icon;
      try {
        imported = require("@fortawesome/" + pre)[result];
      } catch (e) {}
      if (imported) {
        this.setState({
          identifierSubmit: imported
        });
      }
    }
  };

  focus = () => {
    this.setState({
      identifierFocus: true
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
      params,
      nochildren,
      identifier,
      identifierSubmit
    } = this.state;
    return (
      <div>
        <Row>
          <Col lg={{ offset: 2, size: 8 }}>
            <Row>
              <Col className="vertical-center" lg={{ size: 12 }}>
                <span>
                  <span className="title">Select</span>
                  <span
                    className="tooltip-select"
                    data-tip
                    data-for="tooltip-select"
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </span>
                </span>
                <ReactTooltip
                  id="tooltip-select"
                  place="top"
                  type="dark"
                  effect="float"
                >
                  <div style={{ maxWidth: "800px" }}>
                    Choose the HTML element you would like to customize, input
                    the name you would like to use for your component/class, and
                    adjust the backdrop (for preview purposes only, the backdrop
                    color won't carry over to the actual code)
                  </div>
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
                {selected && selected.type === "FontAwesome" ? (
                  <Fragment>
                    <Row className="margin-20">
                      <Col className="vertical-center" lg={{ size: 6 }}>
                        <span>Identifier</span>{" "}
                        <span
                          className="tooltip-select no-margin"
                          data-tip
                          data-for="identifier"
                        >
                          <FontAwesomeIcon icon={faQuestionCircle} />
                        </span>
                        <ReactTooltip
                          id="identifier"
                          place="top"
                          type="dark"
                          effect="float"
                        >
                          <div style={{ maxWidth: "800px" }}>
                            <div>
                              Find the icon you'd like to import from
                              FontAwesome, and simply copy its class name here.
                            </div>
                            <div>Example: fas fa-question-circle</div>
                          </div>
                        </ReactTooltip>
                      </Col>
                      <Col lg={{ size: 5 }}>
                        <input
                          onFocus={this.focus}
                          onBlur={this.submitIdentifier}
                          onChange={this.handleIdentifier}
                          value={identifier}
                          style={{ width: "100%" }}
                          type="text"
                        />
                      </Col>
                      <Col lg="1">
                        <a
                          href="https://fontawesome.com/icons?d=gallery&m=free"
                          target="_blank"
                        >
                          <FontAwesomeIcon style={{color: "gray"}} icon={faExternalLinkAlt} />
                        </a>
                      </Col>
                    </Row>
                  </Fragment>
                ) : null}
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
                  <span
                    className="tooltip-select"
                    data-tip
                    data-for="tooltip-customize"
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </span>
                </span>
                <ReactTooltip
                  id="tooltip-customize"
                  place="top"
                  type="dark"
                  effect="float"
                >
                  Customize your component by using the provided fields. If
                  you'd like to use an attribute that isn't specified in the
                  pre-defined tabs, you can find all CSS attributes in the
                  Custom tab.
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
                <span
                  className="tooltip-select"
                  data-tip
                  data-for="tooltip-preview"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
              </span>
              <ReactTooltip
                id="tooltip-preview"
                place="top"
                type="dark"
                effect="float"
              >
                See a preview of your component as you are customizing it, all
                changes will be reflected to the preview as a change is made.
              </ReactTooltip>
            </Col>
          </Row>
        ) : null}
        <Row className="margin-20">
          <Col className="align-center" lg={{ offset: 1, size: 10 }}>
            {Component ? (
              nochildren ? (
                <div
                  style={{
                    background: testBackground
                  }}
                  className="backdrop"
                >
                  <Component
                    icon={
                      selected.type === "FontAwesome" ? identifierSubmit : null
                    }
                  />
                </div>
              ) : (
                <div
                  style={{
                    background: testBackground
                  }}
                  className="backdrop"
                >
                  <Component>{inputText}</Component>
                </div>
              )
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col lg={{ offset: 2, size: 10 }}>
            <span>
              <span className="title">Copy</span>
              <span className="tooltip-select" data-tip data-for="tooltip-code">
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </span>
            <ReactTooltip
              id="tooltip-code"
              place="top"
              type="dark"
              effect="float"
            >
              Simply click either the Styled or the CSS code to copy it to your
              clipboard, and paste into your project!
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
