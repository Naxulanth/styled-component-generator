import React, { Component } from "react";
import MainContainer from "containers/MainContainer";
import Footer from "containers/Footer";
import "./style.css";

class Main extends Component {
  render() {
    return (
      <div className="pad">
        <MainContainer />
        <Footer />
      </div>
    );
  }
}

export default Main;
