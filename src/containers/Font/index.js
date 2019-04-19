import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";
import { fontStyle } from "constants/options";
import OptionSelect from "containers/OptionSelect";
import PropTypes from "prop-types";

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
    const { data } = this.props;
    return (
      <Row>
        <Col lg="6">
          <Row>
            <Col lg="12">
              <Option
                data={data["font-size" + this.props.pseudo]}
                pseudo={this.props.pseudo}
                sendData={this.getData}
                option="font-size"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <OptionSelect
                data={data["font-style" + this.props.pseudo]}
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
                data={data["font-weight" + this.props.pseudo]}
                pseudo={this.props.pseudo}
                step={100}
                min={100}
                max={900}
                noPx
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

Color.propTypes = {
  data: PropTypes.object,
  pseudo: PropTypes.string,
  sendData: PropTypes.func
};

export default Font;
