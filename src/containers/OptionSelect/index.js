import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import Button from "components/Button";
import _ from "lodash/core";

class OptionSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.option]: null,
      optionSelect: null,
      important: false,
      hide: false
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

  componentWillUnmount() {
    const { dummy } = this.props;
    if (!dummy) {
      const { sendData } = this.props;
      let tempState = {};
      tempState[this.props.option] = null;
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

  hide = () => {
    this.setState({
      hide: !this.state.hide
    });
  };

  render() {
    const { option, options, className } = this.props;
    const { optionSelect, hide  } = this.state;
    return (
      <div className={className}>
        <Row>
          <Col className="margin-10 align-center" lg="8">
            {option}
          </Col>
          <Col lg="4">
            <span className="hide-show" onClick={this.hide}>
            {hide ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
            </span>
          </Col>
        </Row>
        {!hide ? (
          <Row className="margin-10">
            <Col lg="6">
              <Select
                options={options}
                onChange={this.handleSelect}
                selected={optionSelect}
              />
            </Col>
            <Col className="align-center vertical-center" lg="6">
              <Button onClick={this.handleImportant.bind(this, option)}>
                important
              </Button>
            </Col>
          </Row>
        ) : null}
      </div>
    );
  }
}
export default OptionSelect;
