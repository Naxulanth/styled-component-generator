import React, { PureComponent, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { attributes } from "constants/attributes";
import Select from "react-select";
import _ from "lodash/core";
import uuidv4 from "uuid/v4";

class Custom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: {},
      hiders: {},
      components: {},
      selected: [],
      renderLeft: [],
      renderRight: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { sendData } = this.props;
    if (!_.isEqual(prevState, this.state)) {
      let tempState = Object.assign({}, this.state.values);
      sendData(tempState);
    }
    console.log(this.state.hiders);
  }

  generate = () => {
    const { components } = this.state;
    let tempComponents = Object.assign({}, components);
    let map = {};
    let l = [];
    let r = [];
    Object.keys(tempComponents).forEach(key => {
      let c = tempComponents[key].type.name;
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
              options={s ? (s.option ? s.option : null) : null}
              sendData={this.getData}
              option={secondKey}
              data={s.data}
              hide={s.hide}
            />
          );
        l.push(
          <Row key={uuidv4()}>
            <Col lg="12">
              <First
                options={f.option ? f.option : null}
                sendData={this.getData}
                option={firstKey}
                data={f.data}
                hide={f.hide}
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
                <First dummy option="test" className={"hidden"} />
              )}
            </Col>
          </Row>
        );
      }
    });
    this.setState({
      renderLeft: l,
      renderRight: r
    });
  };

  getData = data => {
    let merged = { ...this.state.values, ...data.tempState };
    let mergedHiders = { ...this.state.hiders, ...data.tempHiders };
    this.setState({
      values: merged,
      hiders: mergedHiders
    });
  };

  handleSelect = e => {
    const { values, hiders } = this.state;
    let c = {};
    e.forEach(selected => {
      c[selected.label] = {
        type: selected.type,
        option: selected.option,
        data: values[selected.label],
        hide: hiders[selected.label]
      };
    });
    let v = Object.assign({}, values);
    Object.keys(v).forEach(key => {
      if (!JSON.stringify(e).includes(key)) v[key] = null;
    });
    let h = Object.assign({}, hiders);
    Object.keys(h).forEach(key => {
      if (!JSON.stringify(e).includes(key)) v[key] = null;
    });
    this.setState(
      {
        selected: e,
        components: c,
        values: v,
        hiders: h
      },
      this.generate
    );
  };

  render() {
    const { selected, renderLeft, renderRight } = this.state;
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
export default Custom;
