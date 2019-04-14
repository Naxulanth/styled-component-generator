import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import OptionColor from "containers/OptionColor";

class Color extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = data => {
    const { sendData } = this.props;
      sendData(data.tempState);
  };

  render() {
    const { data } = this.props
    return (
      <Fragment>
        <Row>
          <Col className="align-center" lg="6">
            <OptionColor data={data["border-width" + this.props.pseudo]} pseudo={this.props.pseudo} option="color" sendData={this.getData} />
          </Col>
          <Col className="align-center" lg="6">
            <OptionColor data={data["border-width" + this.props.pseudo]} pseudo={this.props.pseudo} option="background" sendData={this.getData} />
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Color;
