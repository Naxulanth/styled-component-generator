import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";
import { borderStyle } from "constants/options";
import OptionColor from "containers/OptionColor";
import OptionSelect from "containers/OptionSelect";

class Border extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  getData = data => {
    const { sendData } = this.props;
<<<<<<< HEAD
    sendData(data);
=======
    sendData(data.tempState);
>>>>>>> 438b6eaf0224bc02812d3138c7465acd094afc65
  };


  handleSelect = e => {
    if (!e) {
      e = this.state.selected;
    }
    this.setState({
      selected: e,
      "border-style":
        (e.value !== "" ? e.value : null) +
        (this.state["border-style-important"] ? " !important" : "")
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            <OptionColor
              pseudo={this.props.pseudo}
              option="border-color"
              sendData={this.getData}
            />
          </Col>
          <Col className="align-center vertical-center" lg="6">
            <Option
              pseudo={this.props.pseudo}
              sendData={this.getData}
              option="border-width"
            />
            <Option
              pseudo={this.props.pseudo}
              sendData={this.getData}
              option="border-radius"
            />
            <OptionSelect
              pseudo={this.props.pseudo}
              options={borderStyle}
              sendData={this.getData}
              option="border-style"
            />
            <Row />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Border;
