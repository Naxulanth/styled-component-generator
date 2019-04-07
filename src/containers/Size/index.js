import React, { Component, Fragment } from "react";
import _ from "lodash/core";
import Option from "containers/Option";

class Size extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState);
    }
  }

  getData = data => {
    let merged = { ...this.state, ...data };
    this.setState(merged);
  };

  render() {
    const { px } = this.state;
    return (
      <Fragment>
        <Option sendData={this.getData} option="width" />
        <Option sendData={this.getData} option="height" />
        <Option sendData={this.getData} option="min-height" />
        <Option sendData={this.getData} option="max-height" />
        <Option sendData={this.getData} option="min-width" />
        <Option sendData={this.getData} option="max-width" />
      </Fragment>
    );
  }
}
export default Size;
