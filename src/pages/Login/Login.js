import React, { Component } from "react";
import "../styles/styles.css";
class Login extends Component {
  render() {
    return (
      <div className="container login-bg-color">
        <div className="login">
          <h1 className="login__title">Login</h1>
          <form className="login__form">
            <label className="login__form__label" htmlFor="">
              Username
            </label>
            <input type="text" name="username" />
            <label className="login__form__label" htmlFor="">
              Password
            </label>
            <input type="text" name="password" />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
