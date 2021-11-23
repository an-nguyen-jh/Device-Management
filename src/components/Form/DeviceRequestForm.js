import React, { Component } from "react";
import "../styles/form.css";
import toast, { Toaster } from "react-hot-toast";
import { Field, Form } from "react-final-form";
import { Button, Input } from "..";
import { teamOptions, deviceOptions } from "../../config/formData/formData";

class DeviceRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      team: "",
      device: "",
    };
    this.handleRequestDeviceSubmit = this.handleRequestDeviceSubmit.bind(this);
    this.clearFormInput = this.clearFormInput.bind(this);
  }

  validateRequireField = (value) => {
    return value.length > 0 ? undefined : "This field is required";
  };

  validateNumberOfDevice = (value) => {
    return value >= 0 ? undefined : "Number of device must be positive";
  };

  clearFormInput() {
    this.setState({
      name: "",
      team: "",
      device: "",
    });
  }

  handleRequestDeviceSubmit(values) {}

  render() {
    const { name, team, device } = this.state;
    return (
      <div className="form-wrapper">
        <Toaster />
        <div className="form-center-container">
          <Form
            onSubmit={this.handleRequestDeviceSubmit}
            subscription={{ submitting: true }}
            initialValues={{
              name,
              team,
              device,
            }}
          >
            {({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit} className="device__form">
                  <h2 className="form__title"> Yêu cầu cấp thiết bị</h2>
                  <div className="form__split-bar"></div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        1. Họ tên:{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Nhập họ và tên"
                        required
                        validate={this.validateRequireField}
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
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        2. Team{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="team"
                        type="text"
                        required
                        subscription={{
                          value: true,
                          touched: true,
                          error: true,
                          active: true,
                        }}
                        // validate={this.validateRequireField}
                        options={teamOptions}
                      >
                        {({ input, meta, options, ...rest }) => (
                          <>
                            <select
                              className="input--outlined"
                              {...rest}
                              {...input}
                            >
                              <option key={""} value={""}></option>
                              {options.map((team) => {
                                return (
                                  <option key={team} value={team}>
                                    Team {team}
                                  </option>
                                );
                              })}
                            </select>
                            {meta.error && meta.touched && (
                              <span className="input--error">
                                * {meta.error}
                              </span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        3. Thiết bị cần cung cấp{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="device"
                        type="text"
                        required
                        subscription={{
                          value: true,
                          touched: true,
                          error: true,
                          active: true,
                        }}
                        validate={this.validateRequireField}
                        options={deviceOptions}
                      >
                        {({ input, meta, options, ...rest }) => (
                          <>
                            <select
                              className="input--outlined"
                              {...rest}
                              {...input}
                            >
                              <option key={""} value={""}></option>
                              {options.map((device) => {
                                return (
                                  <option key={device} value={device}>
                                    {device}
                                  </option>
                                );
                              })}
                            </select>
                            {meta.error && meta.touched && (
                              <span className="input--error">
                                * {meta.error}
                              </span>
                            )}
                          </>
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        1. Chú thích:{" "}
                      </label>
                      <Field
                        name="reason"
                        type="text"
                        placeholder="Chú thích ..."
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
                    </div>
                  </div>
                  <div className="form__split-bar"></div>
                  <div className="device__form__btn-group">
                    <Button type="submit" color="primary" disabled={submitting}>
                      Submit
                    </Button>
                    <Button variant="text" onClick={this.clearFormInput}>
                      Clear Form
                    </Button>
                  </div>
                </form>
              );
            }}
          </Form>
        </div>
      </div>
    );
  }
}

export default DeviceRequestForm;
