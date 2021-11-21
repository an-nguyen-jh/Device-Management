import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { signout } from "../../apiService";
import { Button, Appbar } from "../../components";
import { authenticationAction } from "../../store/actions";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async signOut() {
    try {
      await signout();
      this.props.removeUserAuthenticationInfo();
    } catch (error) {}
  }

  render() {
    return (
      <div className="container page-wrapper">
        <Appbar></Appbar>
        <div className="content"></div>
        {/* <Route exact path="/provide-info">
          <div>Provide Devices Info Form</div>
        </Route>
        <Route exact path="/ request-device">
          <div>Request Devices Form</div>
        </Route>
        <Route exact path={`/employee`}>
          <Redirect to="/employee/provide-info" />
        </Route> */}
      </div>
    );
  }
}
const mapDispatchToProps = {
  removeUserAuthenticationInfo:
    authenticationAction.removeUserAuthenticationInfo,
};

export default connect(null, mapDispatchToProps)(Employee);
