import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import Select from "react-select";
import _ from "lodash/core";
import Option from "containers/Option";
import { ChromePicker } from "react-color";

class Custom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state);
      sendData(tempState);
    }
  }

  getData = data => {
    let merged = { ...this.state, ...data };
    this.setState(merged);
  };

  handleSelect = e => {
    this.setState({
      [e.value]: null,
    });
  };

  render() {
    return (
      <Fragment>
        <Row className="margin-20">
          <Col lg="4">
            <Select
              options={attributes}
              value={null}
              onChange={this.handleSelect}
              placeholder={"Select attribute..."}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            {Object.keys(this.state).forEach(key => {
              let attribute = this.state[key];
              console.log(key);
            })}
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default Custom;
