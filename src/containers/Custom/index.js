import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import Select from "react-select";
import _ from "lodash/core";
import uuidv4 from "uuid/v4";
import Option from "containers/Option";
import { ChromePicker } from "react-color";

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
    const { values, components, selected, render } = this.state;
    let r = Object.keys(components).map( key => {
      let Component = components[key];
      return <Component key={key} sendData={this.getData} option={key} />;
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
    const { values, components, selected } = this.state;
    let c = {};
    e.forEach(selected => {
      c[selected.label] = selected.type;
    });
    this.setState({
      selected: e,
      components: c
    }, this.generate);
  };

  render() {
    const { values, components, selected, render } = this.state;
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
        <Row>
          <Col lg="6">{render}</Col>
        </Row>
      </Fragment>
    );
  }
}
export default Custom;
