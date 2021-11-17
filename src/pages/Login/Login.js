import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { Input, Alert } from "../../components";
import "../styles/login.css";
import { isValidEmail, isValidPassword } from "../../utils/validte";
import { loginWithEmailAndPassword } from "../../apiService";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
    };
    this.handleEmailAndPasswordSubmit =
      this.handleEmailAndPasswordSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  async handleEmailAndPasswordSubmit(values) {
    const { email, password } = values;
    try {
      this.setState({ errorMsg: "" });
      const result = await loginWithEmailAndPassword(email, password);
      //store user info
      localStorage.setItem("token", result._tokenResponse);
      this.props.history.push({
        pathname: `auth/employee`,
      });
    } catch (error) {
      this.setState({ errorMsg: "Failed to login" });
    }
  }

  validateEmail = (email) => {
    return isValidEmail(email) ? undefined : "Email is invalid";
  };
  validatePassword(password) {
    return isValidPassword(password) ? undefined : "Password is invalid";
  }

  render() {
    const { errorMsg } = this.state;
    return (
      <div className="container login-bg-color">
        <div className="login">
          <h1 className="login__title">Login</h1>
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
          <Form
            onSubmit={this.handleEmailAndPasswordSubmit}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit} className="login__form">
                  <label className="login__form__label">Email</label>
                  <Field
                    name="email"
                    type="email"
                    validate={this.validateEmail}
                    placeholder="Email..."
                    subscription={{
                      value: true,
                      touched: true,
                      error: true,
                    }}
                  >
                    {({ input, meta, ...rest }) => (
                      <Input
                        {...input}
                        {...rest}
                        error={meta.error && meta.touched}
                        errorMsg={meta.error}
                      ></Input>
                    )}
                  </Field>
                  <label className="login__form__label">Password</label>
                  <Field
                    name="password"
                    type="password"
                    validate={this.validatePassword}
                    placeholder="Password..."
                    subscription={{
                      value: true,
                      touched: true,
                      error: true,
                    }}
                  >
                    {({ input, meta, ...rest }) => (
                      <Input
                        {...input}
                        {...rest}
                        error={meta.error && meta.touched}
                        errorMsg={meta.error}
                      ></Input>
                    )}
                  </Field>
                  <button
                    type="submit"
                    className="login__form__button"
                    disabled={submitting}
                  >
                    Login
                  </button>
                </form>
              );
            }}
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
