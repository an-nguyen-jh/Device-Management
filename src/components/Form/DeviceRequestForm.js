import React, { Component } from "react";
import "../styles/form.css";
import toast from "react-hot-toast";
import { Field, Form } from "react-final-form";
import { Button, Input, Select } from "..";
import { teamOptions, deviceOptions } from "../../config/options/options";
import { connect } from "react-redux";
import { addNewRequestDevice } from "../../apiService";

class DeviceRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      team: "",
      device: "",
      numberOfDevice: 1,
      notice: "",
    };
    this.handleRequestDeviceSubmit = this.handleRequestDeviceSubmit.bind(this);
    this.clearFormInput = this.clearFormInput.bind(this);
  }

  validateRequireField = (value) => {
    return value && value.length > 0 ? undefined : "This field is required";
  };

  validateNumberOfDevice = (value) => {
    return value > 0 ? undefined : "Number of device must be positive";
  };

  clearFormInput(e) {
    e.preventDefault();
    this.setState({
      name: "",
      team: "",
      device: "",
      numberOfDevice: 1,
      notice: "",
    });
  }

  async handleRequestDeviceSubmit(values) {
    try {
      const newRequestDevice = { ...values, employee: this.props.userEmail };
      await addNewRequestDevice(newRequestDevice);
      toast.success("Success request device", {
        className: "toast-notification",
      });
    } catch (error) {
      toast.error("Error in request device", {
        className: "toast-notification",
      });
    }
  }

  render() {
    const { name, team, device, numberOfDevice, notice } = this.state;
    return (
      <div className="form-wrapper">
        <div className="form-center-container">
          <Form
            onSubmit={this.handleRequestDeviceSubmit}
            subscription={{ submitting: true }}
            initialValues={{
              name,
              team,
              device,
              numberOfDevice,
              notice,
            }}
          >
            {({ handleSubmit, submitting, form }) => {
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
                        validate={this.validateRequireField}
                        options={teamOptions}
                      >
                        {({ input, meta, options, ...rest }) => (
                          <Select
                            {...rest}
                            {...input}
                            options={options}
                            error={meta.error && meta.touched && !meta.active}
                            errorMsg={meta.error}
                          ></Select>
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
                          <Select
                            {...rest}
                            {...input}
                            options={options}
                            error={meta.error && meta.touched && !meta.active}
                            errorMsg={meta.error}
                          ></Select>
                        )}
                      </Field>
                    </div>
                    <div className="device__form__input-wrapper ">
                      <label className="device__form__label">
                        4. Số lượng thiết bị cần cung cấp:
                      </label>
                      <Field
                        name="numberOfDevice"
                        type="number"
                        validate={this.validateNumberOfDevice}
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
                        5. Chú thích:{" "}
                      </label>
                      <Field
                        name="notice"
                        type="text"
                        placeholder="Lý do cần cấp, yêu cầu về thiết bị, ..."
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
                    <Button
                      variant="text"
                      onClick={(e) => {
                        form.reset();
                        this.clearFormInput(e);
                      }}
                    >
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

const mapStateToProps = (state) => {
  return {
    userEmail: state.auth.userEmail,
  };
};

export default connect(mapStateToProps, null)(DeviceRequestForm);
