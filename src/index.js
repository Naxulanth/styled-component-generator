import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Main from "scenes/Main";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

ReactDOM.render(
  <Fragment>
    <ToastContainer autoClose={2000} />
    <Main />
  </Fragment>,
  document.getElementById("root")
);
