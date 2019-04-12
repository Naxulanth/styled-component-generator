import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";
import { fontStyle, fontWeight } from "constants/options";
import OptionSelect from "containers/OptionSelect";

class Font extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = data => {
    const { sendData } = this.props;
      sendData(data.tempState);
  };

  render() {
    return (
      <Row>
        <Col lg="6">
          <Row>
            <Col lg="12">
              <Option
                pseudo={this.props.pseudo}
                sendData={this.getData}
                option="font-size"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <OptionSelect
                pseudo={this.props.pseudo}
                options={fontStyle}
                sendData={this.getData}
                option="font-style"
              />
            </Col>
          </Row>
        </Col>
        <Col lg="6">
          <Row>
            <Col>
              <Option
                pseudo={this.props.pseudo}
                step={100}
                min={100}
                max={900}
                noPx
                options={fontWeight}
                sendData={this.getData}
                option="font-weight"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default Font;
