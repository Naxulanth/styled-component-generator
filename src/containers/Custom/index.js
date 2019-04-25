import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import PropTypes from "prop-types";
import { model } from "constants/custom";
import Select from "react-select";
import _ from "lodash/core";
import uuidv4 from "uuid/v4";

class Custom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      "": Object.assign({}, model),
      "-hover": Object.assign({}, model),
      "-disabled": Object.assign({}, model),
      "-focus": Object.assign({}, model),
      "-active": Object.assign({}, model),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData, pseudo } = this.props;
    if (!_.isEqual(prevState[pseudo], this.state[pseudo])) {
      let tempState = Object.assign({}, this.state[pseudo].values);
      sendData(tempState);
    }
    if (
      !_.isEqual(prevState[pseudo].hiders, this.state[pseudo].hiders) ||
      prevProps.pseudo !== pseudo
    ) {
      this.generate();
    }
  }

  generate = () => {
    const { pseudo } = this.props;
    let tempComponents = Object.assign({}, this.state[pseudo].components);
    let map = {};
    let l = [];
    let r = [];
    Object.keys(tempComponents).forEach(key => {
      let c = tempComponents[key];
      if (c.option) c = "OptionSelect";
      else if (key.includes("color")) c = "OptionColor";
      else c = "Option";
      if (!map[c]) map[c] = {};
      map[c][key] = tempComponents[key];
    });
    Object.keys(map).forEach(catKey => {
      let cat = map[catKey];
      for (let i = 0; i < Object.keys(cat).length; i += 2) {
        let firstKey = Object.keys(cat)[i];
        let f = cat[firstKey];
        let First = f.type;
        let s = null;
        let Second = null;
        let SecondRender = null;
        let secondKey = Object.keys(cat)[i + 1]
          ? Object.keys(cat)[i + 1]
          : null;
        if (secondKey) s = cat[secondKey];
        if (s) Second = s.type;
        if (Second)
          SecondRender = (
            <Second
              pseudo={pseudo}
              options={s ? (s.option ? s.option : null) : null}
              sendData={this.getData}
              option={secondKey}
              data={
                this.state[pseudo].values[secondKey + pseudo]
                  ? this.state[pseudo].values[secondKey + pseudo]
                  : null
              }
              hide={this.state[pseudo].hiders[secondKey + pseudo]}
              pxOption={!s.pxOption}
              min={s.min}
              max={s.max}
              noPx={s.noPx}
            />
          );
        l.push(
          <Row key={uuidv4()}>
            <Col lg="12">
              <First
                pseudo={pseudo}
                options={f.option ? f.option : null}
                sendData={this.getData}
                option={firstKey}
                data={
                  this.state[pseudo].values[firstKey + pseudo]
                    ? this.state[pseudo].values[firstKey + pseudo]
                    : null
                }
                hide={this.state[pseudo].hiders[firstKey + pseudo]}
                pxOption={!f.pxOption}
                min={f.min}
                max={f.max}
                noPx={f.noPx}
              />
            </Col>
          </Row>
        );
        r.push(
          <Row key={uuidv4()}>
            <Col lg="12">
              {SecondRender ? (
                SecondRender
              ) : (
                <First
                  hide={this.state[pseudo].hiders[firstKey + pseudo]}
                  dummy
                  option="test"
                  className={"hidden"}
                />
              )}
            </Col>
          </Row>
        );
      }
    });
    let tempState = Object.assign({}, this.state[pseudo]);
    tempState["renderLeft"] = l;
    tempState["renderRight"] = r;
    this.setState({
      [pseudo]: tempState
    });
  };

  getData = data => {
    const { pseudo } = this.props;
    let merged = { ...this.state[pseudo].values, ...data.tempState };
    let mergedHiders = { ...this.state[pseudo].hiders, ...data.tempHiders };
    let tempState = Object.assign({}, this.state[pseudo]);
    tempState["values"] = merged;
    tempState["hiders"] = mergedHiders;
    this.setState({
      [pseudo]: tempState
    });
  };

  handleSelect = e => {
    const { pseudo } = this.props;
    let c = {};
    e.forEach(selected => {
      c[selected.label] = {
        type: selected.type,
        option: selected.option,
        data: this.state[pseudo].values[selected.label],
        hide: this.state[pseudo].hiders[selected.label],
        pxOption: selected.pxOption,
        min: selected.min,
        max: selected.max,
        noPx: selected.noPx
      };
    });
    let v = Object.assign({}, this.state[pseudo].values);
    Object.keys(v).forEach(key => {
      if (!JSON.stringify(e).includes(key)) v[key] = null;
    });
    let h = Object.assign({}, this.state[pseudo].hiders);
    Object.keys(h).forEach(key => {
      if (!JSON.stringify(e).includes(key)) v[key] = null;
    });
    let tempState = Object.assign({}, this.state[pseudo]);
    tempState["selected"] = e;
    tempState["components"] = c;
    tempState["values"] = v;
    tempState["hiders"] = h;
    this.setState(
      {
        [pseudo]: tempState
      },
      this.generate
    );
  };

  render() {
    const { pseudo } = this.props;
    const { selected, renderLeft, renderRight } = this.state[pseudo];
    return (
      <Fragment>
        <Row className="margin-20">
          <Col lg="12">
            <Select
              isMulti
              options={attributes}
              value={selected}
              onChange={this.handleSelect}
              placeholder={"Select attribute..."}
            />
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg="6">
            <Row>
              <Col lg="12">{renderLeft}</Col>
            </Row>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="12">{renderRight}</Col>
            </Row>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

Custom.propTypes = {
  pseudo: PropTypes.string,
  sendData: PropTypes.func
};

export default Custom;
