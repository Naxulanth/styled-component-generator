import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Main from "scenes/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebFont from 'webfontloader';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

//const { whyDidYouUpdate } = require("why-did-you-update");
//whyDidYouUpdate(React);

WebFont.load({
  google: {
    families: ["Roboto:300,400,700", "sans-serif"]
  }
});

ReactDOM.render(
  <Fragment>
    <ToastContainer autoClose={2000} />
    <Main />
  </Fragment>,
  document.getElementById("root")
);
