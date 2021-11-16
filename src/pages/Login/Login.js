import React, { Component } from "react";
import { Input } from "../../components";
import "../styles/login.css";

class Login extends Component {
  render() {
    return (
      <div className="container login-bg-color">
        <div className="login">
          <h1 className="login__title">Login</h1>
          <form className="login__form">
            <label className="login__form__label">Username</label>
            <Input name="email" type="text" placeholder="Email"></Input>
            <label className="login__form__label">Password</label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
            ></Input>
            <button className="login__form__button"> Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
