import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import Select from "react-select";
import _ from "lodash/core";
import uuidv4 from "uuid/v4";

class Custom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      components: {},
      selected: [],
      render: []
    };
    this.elements = [];
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
      let Component = components[key];
      this.elements.push(
        <Col key={key} lg="6">
          <Component sendData={this.getData} option={key} />
        </Col>
      );
      console.log(components);
      if ((i + 1) % 2 === 0 || i === Object.keys(components).length - 1) {
        let result = this.elements;
        this.elements = [];
        return <Row key={uuidv4()}>{result}</Row>;
      } else return null;
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
      c[selected.label] = selected.type;
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
        {render}
      </Fragment>
    );
  }
}
export default Custom;
