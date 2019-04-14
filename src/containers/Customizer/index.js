import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import Size from "containers/Size";
import Button from "components/Button";
import _ from "lodash/core";
import Border from "containers/Border";
import Placement from "containers/Placement";
import Custom from "containers/Custom";
import Color from "containers/Color";
import Font from "containers/Font";
class Customizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      hideDetails: false,
      activeTabPseudo: ""
    };
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (
      !_.isEqual(prevState, this.state) ||
      !this.props.selected
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTab } = this.state;
    if (!prevProps.selected && !activeTab) {
      let activeTab = "1";
      this.setState({
        activeTab
      });
    }
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  togglePseudo = tab => {
    if (this.state.activeTabPseudo !== tab) {
      this.setState({
        activeTabPseudo: tab
      });
    }
  };

  handleHide = () => {
    this.setState({
      hideDetails: !this.state.hideDetails
    });
  };

  getData = data => {
    const { sendData } = this.props;
    sendData(data);
  };

  render() {
    const { selected, params } = this.props;
    const { activeTabPseudo, activeTab, hideDetails } = this.state;
    return (
      <Fragment>
        <Row>
          <Col lg="10">
            <Nav tabs>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTabPseudo === ""
                  })}
                  onClick={() => {
                    this.togglePseudo("");
                  }}
                >
                  None
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTabPseudo === "-hover"
                  })}
                  onClick={() => {
                    this.togglePseudo("-hover");
                  }}
                >
                  Hover
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTabPseudo === "-focus"
                  })}
                  onClick={() => {
                    this.togglePseudo("-focus");
                  }}
                >
                  Focus
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTabPseudo === "-disabled"
                  })}
                  onClick={() => {
                    this.togglePseudo("-disabled");
                  }}
                >
                  Disabled
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <Row className="margin-20">
          <Col lg="10">
            <Nav tabs>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Border
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Size
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "3"
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Color
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "4"
                  })}
                  onClick={() => {
                    this.toggle("4");
                  }}
                >
                  Placement
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "5"
                  })}
                  onClick={() => {
                    this.toggle("5");
                  }}
                >
                  Font
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={!selected}
                  className={classnames({
                    active: activeTab === "6"
                  })}
                  onClick={() => {
                    this.toggle("6");
                  }}
                >
                  Custom
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="vertical-center align-center" lg="2">
            {selected ? (
              <Button onClick={this.handleHide}>
                {hideDetails ? "Show" : "Hide"} Settings
              </Button>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <div style={{ display: hideDetails ? "none" : "block" }}>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Border
                data={params}
                pseudo={activeTabPseudo}
                sendData={this.getData}
              />
            </TabPane>
          </TabContent>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">
              <Size
                data={params}
                pseudo={activeTabPseudo}
                sendData={this.getData}
              />
            </TabPane>
          </TabContent>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="3">
              <Color
                data={params}
                pseudo={activeTabPseudo}
                sendData={this.getData}
              />
            </TabPane>
          </TabContent>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="4">
              <Placement
                data={params}
                pseudo={activeTabPseudo}
                sendData={this.getData}
              />
            </TabPane>
          </TabContent>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="5">
              <Font
                data={params}
                pseudo={activeTabPseudo}
                sendData={this.getData}
              />
            </TabPane>
          </TabContent>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="6">
              <Custom pseudo={activeTabPseudo} sendData={this.getData} />
            </TabPane>
          </TabContent>
        </div>
      </Fragment>
    );
  }
}

export default Customizer;
