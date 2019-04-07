import React, { Component, Fragment } from "react";
import _ from "lodash/core";
import Option from "containers/Option";

class Font extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    return (
      <Fragment>
      <Option sendData={this.getData} option="font-size" />
      </Fragment>
    );
  }
}
export default Font;
