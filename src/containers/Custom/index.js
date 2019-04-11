import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import Select from "react-select";
import _ from "lodash/core";

class Custom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      components: {},
      selected: [],
      render: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state.values);
      sendData(tempState);
    }
  }

  generate = () => {
    const { components } = this.state;
    let r = Object.keys(components).map((key, i) => {
      let Component = components[key].type;
      return (
        <Row key={key}>
          <Col lg="12">
            <Component
              options={components[key].option ? components[key].option : null}
              sendData={this.getData}
              option={key}
            />
          </Col>
        </Row>
      );
    });
    this.setState({
      render: r
    });
  };

  getData = data => {
    let merged = { ...this.state.values, ...data };
    this.setState({
      values: merged
    });
  };

  handleSelect = e => {
    let c = {};
    e.forEach(selected => {
      c[selected.label] = { type: selected.type, option: selected.option };
    });
    this.setState(
      {
        selected: e,
        components: c
      },
      this.generate
    );
  };

  render() {
    const { selected, render } = this.state;
    return (
      <Fragment>
        <Row className="margin-20">
          <Col lg="12">
            <Select
              isMulti
              options={attributes}
              value={selected}
              onChange={this.handleSelect}
              placeholder={"Select attribute..."}
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg="6">
            <Col lg="12">{render}</Col>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="12">{render}</Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Custom;
