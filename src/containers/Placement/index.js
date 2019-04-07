import React, { PureComponent, Fragment } from "react";
import _ from "lodash/core";
import Option from "containers/Option";

class Placement extends PureComponent {
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
        <Option sendData={this.getData} option="padding-left" />
        <Option sendData={this.getData} option="padding-right" />
        <Option sendData={this.getData} option="padding-top" />
        <Option sendData={this.getData} option="padding-bottom" />
        <Option sendData={this.getData} option="margin-left" />
        <Option sendData={this.getData} option="margin-right" />
        <Option sendData={this.getData} option="margin-top" />
        <Option sendData={this.getData} option="margin-bottom" />
      </Fragment>
    );
  }
}
export default Placement;
