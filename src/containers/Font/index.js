import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import Option from "containers/Option";
import { fontStyle } from "constants/options";
import WebFont from "webfontloader";
import OptionSelect from "containers/OptionSelect";

class Font extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "font-family": ""
    };
  }

  getData = data => {
    const { sendData } = this.props;
    sendData({ ...this.state, ...data.tempState });
  };

  loadFont = e => {
    console.log("tests");
    WebFont.load({
      google: {
        families: [
          this.state["font-family"] + ":100,200,300,400,500,600,700,800,900",
          "sans-serif"
        ]
      }
    });
  };

  handleFamily = e => {
    this.setState({
      "font-family": "'" + e.target.value + "' !important"
    });
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
            <Col lg="12">
              <Option
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
          <Row>
            <Col lg="12">
              <Row>
                <Col className="align-center margin-10" lg="12">
                  font-family
                </Col>
              </Row>
              <Row>
                <Col lg="12" className="align-center">
                  <input
                    type="text"
                    onBlur={this.loadFont}
                    onChange={this.handleFamily}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Font.propTypes = {
  pseudo: PropTypes.string,
  data: PropTypes.object,
  sendData: PropTypes.func
};

export default Font;
