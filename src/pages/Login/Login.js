import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { Input, Alert } from "../../components";
import "../styles/login.css";
import { isValidEmail, isValidPassword } from "../../utils/validator";
import { getUserByEmail, loginWithEmailAndPassword } from "../../apiService";
import { withRouter } from "react-router-dom";
import privateRoute from "../../config/routes";
import { connect } from "react-redux";
import { authenticationAction } from "../../store/actions";
import toast, { Toaster } from "react-hot-toast";

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
      const result = await loginWithEmailAndPassword(email, password);
      const userSnapshot = await getUserByEmail(email);
      const user = userSnapshot.data();
      this.props.storeUserAuthenticationInfo(
        result._tokenResponse.idToken,
        result._tokenResponse.email,
        user.role
      );
      this.props.history.push({
        pathname: `${privateRoute[user.role].pathname}`,
      });
    } catch (error) {
      toast.error("Failed to login", { className: "toast-notification" });
    }
  }

  validateEmail = (email) => {
    return isValidEmail(email) ? undefined : "Email is invalid";
  };

  validatePassword(password) {
    return isValidPassword(password) ? undefined : "Password is invalid";
  }

  componentDidMount() {
    const userRole = this.props.userRole;
    if (userRole) {
      this.props.history.push({
        pathname: `${privateRoute[userRole].pathname}`,
      });
    }
  }

  render() {
    const { errorMsg } = this.state;

    return (
      <div className="container login-bg-color">
        <Toaster />
        <div className="login">
          <h1 className="login__title">Login</h1>
          {errorMsg && <Alert type="error">{errorMsg}</Alert>}
          <Form
            onSubmit={this.handleEmailAndPasswordSubmit}
            subscription={{ submitting: true }}
            initialValues={{ email: "", password: "" }}
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
                      active: true,
                    }}
                  >
                    {({ input, meta, ...rest }) => (
                      <Input
                        {...input}
                        {...rest}
                        error={meta.error && meta.touched && !meta.active}
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
                      active: true,
                    }}
                  >
                    {({ input, meta, ...rest }) => (
                      <Input
                        {...input}
                        {...rest}
                        error={meta.error && meta.touched && !meta.active}
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

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
    userEmail: state.auth.userEmail,
    userRole: state.auth.userRole,
  };
};

const mapDispatchToProps = {
  storeUserAuthenticationInfo: authenticationAction.storeUserAuthenticationInfo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
