import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import OptionColor from "containers/OptionColor";

class Color extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

<<<<<<< HEAD
  
  getData = data => {
    const { sendData } = this.props;
    sendData(data);
=======
  getData = data => {
    const { sendData } = this.props;
      sendData(data.tempState);
>>>>>>> 438b6eaf0224bc02812d3138c7465acd094afc65
  };


  render() {
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            <OptionColor pseudo={this.props.pseudo} option="color" sendData={this.getData} />
          </Col>
          <Col className="align-center" lg="6">
            <OptionColor pseudo={this.props.pseudo} option="background" sendData={this.getData} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Color;
