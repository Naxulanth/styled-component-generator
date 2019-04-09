import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { borderStyle } from "constants/options";
import Select from "react-select";
import Button from "components/Button";
import _ from "lodash/core";

class OptionSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option]: null,
      optionSelect: null,
      important: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = {};
      tempState[this.props.option] = this.state[this.props.option];
      sendData(tempState);
    }
  }

  handleSelect = e => {
    if (!e) {
      e = this.state.optionSelect;
    }
    let param =
      (e.value !== "" ? e.value : null) +
      (this.state.important ? " !important" : "");
    this.setState({
      optionSelect: e,
      [this.props.option]: param
    });
  };

  handleImportant = () => {
    this.setState(
      {
        important: !this.state.important
      },
      this.handleSelect
    );
  };

  render() {
    const { option } = this.props;
    const { optionSelect } = this.state;
    return (
      <Fragment>
        <Row>
          <Col className="margin-10 align-center" lg="12">
            {option}
          </Col>
        </Row>
        <Row className="margin-10">
          <Col lg="6">
            <Select
              options={borderStyle}
              onChange={this.handleSelect}
              selected={optionSelect}
            />
          </Col>
          <Col className="vertical-center" lg="6">
            <Button onClick={this.handleImportant.bind(this, option)}>
              important
            </Button>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
export default OptionSelect;
