import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import { Input } from "..";
import { Button } from "../index";
import "../styles/form.css";

const teamOptions = ["Sweet Cake", "Yin Yang", "Designer", "Admin"];

class DeviceInfoForm extends Component {
  render() {
    return (
      <div className="form-wrapper">
        <div className="form-center-container">
          <Form onSubmit={() => {}} subscription={{ submitting: true }}>
            {({ handleSubmit, submitting }) => {
              return (
                <form className="device__form">
                  <h2 className="form__title"> quản lý thiết bị</h2>
                  <div className="form__split-bar"></div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">1. Họ tên</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Nhập họ và tên"
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
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">2. Team</label>
                      <Field
                        name="team"
                        type="text"
                        subscription={{
                          value: true,
                          touched: true,
                          error: true,
                        }}
                        options={teamOptions}
                      >
                        {({ input, meta, options, name, ...rest }) => (
                          <select
                            className="input--outlined"
                            name={name}
                            defaultValue=""
                            {...rest}
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
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        3. Tên hãng của Laptop/ PC do công ty cấp:
                      </label>
                      <Field
                        name="LaptopCompanyName"
                        type="text"
                        placeholder="Tên hãng PC/LapTop (Mac, Hp, Dell,...)"
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
                    </div>
                    <div className="device__form__input-wrapper ">
                      <label className="device__form__label">
                        4. Số seri của Laptop/ PC do công ty cấp:
                      </label>
                      <Field
                        name="seriNumber"
                        type="text"
                        placeholder="Số seri của thiết bị "
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
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        5. Cấu hình của Laptop/ PC do công ty cấp (System Name/
                        System Model/ Processor) :
                      </label>
                      <Field
                        name="computerConfig"
                        type="text"
                        placeholder="System Name/System Model/ Processor"
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
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        7. Kích thước của màn hình do công ty cấp:
                      </label>
                      <Field
                        name="screenSize"
                        type="text"
                        placeholder="Kích thước màn hình (dài * rộng)"
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
                    </div>
                    <div className="device__form__input-wrapper ">
                      <label className="device__form__label">
                        8. Cấu hình của màn hình do công ty cấp:
                      </label>
                      <Field
                        name="screenConfig"
                        type="text"
                        placeholder="Số seri của thiết bị "
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
                    </div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        9. Số lượng màn hình do công ty cấp:
                      </label>
                      <Field
                        name="numberOfScreen"
                        type="number"
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
                    </div>
                    <div className="device__form__input-wrapper "></div>
                  </div>
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        10. Tên hãng của chuột máy tính do công ty cấp:
                      </label>
                      <Field
                        name="mouseCompanyName"
                        type="text"
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
                    </div>
                    <div className="device__form__input-wrapper ">
                      <label className="device__form__label">
                        11. Số lượng chuột máy tính do công ty cấp:
                      </label>
                      <Field
                        name="numberOfMouse"
                        type="number"
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
                    </div>
                  </div>
                  <div className="form__split-bar"></div>
                  <div className="device__form__btn-group">
                    <Button color="primary"> Submit </Button>
                    <Button type="text"> Clear Form </Button>
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

export default DeviceInfoForm;
