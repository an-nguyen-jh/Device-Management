import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { Input } from "../../components";
import "../styles/login.css";
import { isValidEmail, isValidPassword } from "../../utils/validte";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailAndPasswordSubmit =
      this.handleEmailAndPasswordSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handleEmailAndPasswordSubmit(values) {
    const { email, password } = values;
  }

  validateEmail = (email) => {
    return isValidEmail(email) ? undefined : "Email is invalid";
  };
  validatePassword(password) {
    return isValidPassword(password) ? undefined : "Password is invalid";
  }

  render() {
    return (
      <div className="container login-bg-color">
        <div className="login">
          <h1 className="login__title">Login</h1>
          <Form onSubmit={this.handleEmailAndPasswordSubmit}>
            {({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit} className="login__form">
                  <label className="login__form__label">Email</label>
                  <Field
                    name="email"
                    type="email"
                    validate={this.validateEmail}
                    placeholder="Email..."
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

export default Login;
