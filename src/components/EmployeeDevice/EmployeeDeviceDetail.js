import React, { useEffect, useState } from "react";
import "../styles/employeeDeviceDetail.css";
import { IoIosArrowBack } from "react-icons/io";
import { generateAvatarByName } from "../../utils/generateAvatar";
import { Button, Input } from "..";
import { Field, Form } from "react-final-form";
import { useParams } from "react-router-dom";

function EmployeeDeviceDetail() {
  const [deviceDetails, setDeviceDetails] = useState({});
  const [imageSrcs, setImageSrcs] = useState([]);
  const [computerCompanyName, setComputerCompanyName] = useState("");
  const [computersSeriNumber, setComputersSeriNumber] = useState("");
  const [computerConfig, setComputerConfig] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [screenConfig, setScreenConfig] = useState("");
  const [numberOfScreen, setNumberOfScreen] = useState("");
  const [mouseCompanyName, setMouseCompanyName] = useState("");
  const [numberOfMouse, setNumberOfMouse] = useState("");
  const { id } = useParams();

  const validateRequireField = (value) => {
    return value && value.length > 0 ? undefined : "This field is required";
  };
  const validateNumberOfDevice = (value) => {
    return value >= 0 ? undefined : "Number of device must be positive";
  };

  const handleUpdateDeviceInfo = (values) => {};

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="device-detail-wrapper">
      <div className="device-detail__navigation">
        <div className="device-detail__navigation__go-back">
          <IoIosArrowBack />
          <span>Back</span>
        </div>
        <div className="device-detail__navigation__title">Item Details</div>
      </div>
      <div className="container-fluid">
        <div className="device-detail">
          <div className="device-detail__employee">
            <div className=" device-detail__employee__avatar">
              {generateAvatarByName("Thanh Bình")}
            </div>
            <p className="device-detail__employee__name">deviceDetails.name</p>
            <p className="device-detail__employee__email">
              deviceDetails.emaildeviceDetails.email
            </p>
            <p className="device-detail__employee__team">
              Team: deviceDetails.team
            </p>
            <Button
              variant="text"
              className="device-detail__employee__sign-out"
            >
              Sign out
            </Button>
          </div>
          <div className="device-detail__info">
            <Form
              onSubmit={handleUpdateDeviceInfo}
              subscription={{ submitting: true }}
              initialValues={{
                computerCompanyName,
                computersSeriNumber,
                computerConfig,
                screenSize,
                screenConfig,
                numberOfScreen,
                mouseCompanyName,
                numberOfMouse,
              }}
            >
              {({ handleSubmit, submitting }) => {
                return (
                  <form onSubmit={handleSubmit} className="device__form">
                    <h2 className="form__title">
                      Employee's Device Information
                    </h2>
                    <div className="form__split-bar"></div>
                    <div className="device__form__input-row">
                      <div className="device__form__input-wrapper">
                        <label className="device__form__label">
                          Brand name of Laptop/PC provided by company:
                          <span className="device__form__input-required">
                            *
                          </span>
                        </label>
                        <Field
                          required
                          name="computerCompanyName"
                          type="text"
                          placeholder="Brand name (Mac, Hp, Dell,...)"
                          validate={validateRequireField}
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
                      <div className="device__form__input-wrapper ">
                        <label className="device__form__label">
                          Serial number of Laptop/PC provided by company:
                          <span className="device__form__input-required">
                            *
                          </span>
                        </label>
                        <Field
                          name="computersSeriNumber"
                          type="text"
                          required
                          validate={validateRequireField}
                          placeholder="Serial number of device"
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
                          Laptop/ PC configuration provided by company (System
                          Name/ System Model/ Processor):{" "}
                          <span className="device__form__input-required">
                            *
                          </span>
                        </label>
                        <Field
                          name="computerConfig"
                          type="text"
                          required
                          validate={validateRequireField}
                          placeholder="(System Name/System Model/Processor)"
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
                          Number of monitor provided by company:
                        </label>
                        <Field
                          name="numberOfScreen"
                          type="number"
                          validate={validateNumberOfDevice}
                          subscription={{
                            value: true,
                            touched: true,
                            error: true,
                            active: true,
                          }}
                        >
                          {({ input, meta, ...rest }) => (
                            <>
                              <Input
                                {...input}
                                {...rest}
                                error={
                                  meta.error && meta.touched && !meta.active
                                }
                                errorMsg={meta.error}
                              ></Input>
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="device__form__input-wrapper ">
                        <label className="device__form__label">
                          Monitor configuration provided by company
                        </label>
                        <Field
                          name="screenConfig"
                          type="text"
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
                          Monitor resolution provided by company:
                        </label>
                        <Field
                          name="screenSize"
                          type="text"
                          placeholder="Monitor resolution (width x height)"
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
                      <div className="device__form__input-wrapper "></div>
                    </div>
                    <div className="device__form__input-row">
                      <div className="device__form__input-wrapper">
                        <label className="device__form__label">
                          Brand name of computer mouse provided by the company:
                        </label>
                        <Field
                          name="mouseCompanyName"
                          type="text"
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
                      <div className="device__form__input-wrapper ">
                        <label className="device__form__label">
                          Number of computer mouses provided by company
                        </label>
                        <Field
                          name="numberOfMouse"
                          type="number"
                          validate={validateNumberOfDevice}
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
                      <Button
                        type="submit"
                        color="primary"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                      <Button variant="text">Delete </Button>
                    </div>
                  </form>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmployeeDeviceDetail;
