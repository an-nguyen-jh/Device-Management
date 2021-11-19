import React, { Component } from "react";
import { connect } from "react-redux";
import { signout } from "../../apiService";
import { Button } from "../../components";
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
      <>
        <h1>Employee</h1>
        <Button onClick={this.signOut}>SIGN OUT</Button>
      </>
    );
  }
}
const mapDispatchToProps = {
  removeUserAuthenticationInfo:
    authenticationAction.removeUserAuthenticationInfo,
};

export default connect(null, mapDispatchToProps)(Employee);
