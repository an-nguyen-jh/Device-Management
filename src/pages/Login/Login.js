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
  }

  handleEmailAndPasswordSubmit(values) {
    console.log(values);
  }

  validateEmail(email) {
    return isValidEmail(email) ? "" : "Email is invalid";
  }
  validatePassword(password) {
    return isValidPassword(password) ? "" : "Password is invalid";
  }

  render() {
    return (
      <div className="container login-bg-color">
        <div className="login">
          <h1 className="login__title">Login</h1>
          <Form onSubmit={this.handleEmailAndPasswordSubmit}>
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className="login__form">
                <label className="login__form__label">Email</label>
                <Field name="email" validate={this.validateEmail}>
                  {(props) => (
                    <Input
                      name={props.input.name}
                      type="text"
                      placeholder="Email..."
                      value={props.input.value}
                      onChange={props.input.onChange}
                    ></Input>
                  )}
                </Field>
                <label className="login__form__label">Password</label>
                <Field name="password" validate={this.validatePassword}>
                  {(props) => (
                    <Input
                      name={props.input.name}
                      type="password"
                      placeholder="Password..."
                      value={props.input.value}
                      onChange={props.input.onChange}
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
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
