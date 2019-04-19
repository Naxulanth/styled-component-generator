import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import Option from "containers/Option";

class Placement extends PureComponent {
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
      <Fragment>
        <Row>
          <Col lg="6">
            <Row>
              <Col lg="12">
                <Option
                  data={data["padding-left" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="padding-left"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["padding-right" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="padding-right"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["padding-top" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="padding-top"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["padding-bottom" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="padding-bottom"
                />
              </Col>
            </Row>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="12">
                <Option
                  data={data["margin-left" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="margin-left"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["margin-right" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="margin-right"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["margin-top" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="margin-top"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Option
                  data={data["margin-bottom" + this.props.pseudo]}
                  pseudo={this.props.pseudo}
                  pxOption
                  sendData={this.getData}
                  option="margin-bottom"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Placement.propTypes = {
  pseudo: PropTypes.string,
  sendData: PropTypes.func
};


export default Placement;
