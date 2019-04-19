import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import Option from "containers/Option";
import { borderStyle } from "constants/options";
import OptionColor from "containers/OptionColor";
import OptionSelect from "containers/OptionSelect";
import PropTypes from "prop-types";

class Border extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
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
          <Col className="align-center" lg="6">
            <OptionColor
              pseudo={this.props.pseudo}
              data={data["border-color" + this.props.pseudo]}
              option="border-color"
              sendData={this.getData}
            />
          </Col>
          <Col className="align-center vertical-center" lg="6">
            <Option
              pseudo={this.props.pseudo}
              sendData={this.getData}
              data={data["border-width" + this.props.pseudo]}
              option="border-width"
            />
            <Option
              pseudo={this.props.pseudo}
              data={data["border-radius" + this.props.pseudo]}
              sendData={this.getData}
              option="border-radius"
            />
            <OptionSelect
              pseudo={this.props.pseudo}
              options={borderStyle}
              data={data["border-style" + this.props.pseudo]}
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

Border.propTypes = {
  data: PropTypes.object,
  pseudo: PropTypes.string,
  sendData: PropTypes.func
};

export default Border;
