import React, { Component } from "react";
import {Row, Col} from "reactstrap";
import MainContainer from "containers/MainContainer";
import "./style.css";

class Main extends Component {
  render() {
    return <div className="pad">
        <MainContainer/>
    </div>;
  }
}

export default Main;
