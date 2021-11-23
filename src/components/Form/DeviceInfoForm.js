import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import { Input } from "..";
import {
  getDeviceInfoOfEmployeeByEmail,
  updateDeviceInfoForm,
  uploadEmployeeDeviceImage,
  deleteOldEmployeeImage,
} from "../../apiService";
import { Button } from "../index";
import "../styles/form.css";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { teamOptions } from "../../config/formData/formData";

class DeviceInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenImageSrc: [],
      oldImageSrcs: [],
      previewImages: [],
      name: "",
      team: "",
      computerCompanyName: "",
      computersSeriNumber: "",
      computerConfig: "",
      screenSize: "",
      screenConfig: "",
      numberOfScreen: 0,
      mouseCompanyName: "",
      numberOfMouse: 0,
    };
    this.hanldeChooseImages = this.previewChosenImages.bind(this);
    this.handleDeviceInfoSubmit = this.handleDeviceInfoSubmit.bind(this);
    this.clearFormInput = this.clearFormInput.bind(this);
  }

  previewChosenImages = async (e) => {
    if (e.target.files.length > 0) {
      const images = Array.from(e.target.files);
      this.setState({
        chosenImageSrc: images,
      });
      try {
        const imageURIPromises = images.map((img) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", (event) => {
              resolve(event.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(img);
          });
        });
        const previewImageURIs = await Promise.all(imageURIPromises);
        this.setState({ previewImages: previewImageURIs });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        chosenImageSrc: [],
        previewImages: [],
      });
    }
  };

  validateRequireField = (value) => {
    return value.length > 0 ? undefined : "This field is required";
  };

  validateNumberOfDevice = (value) => {
    return value >= 0 ? undefined : "Number of device must be positive";
  };

  async uploadEmployeeDeviceImages(images, userEmail) {
    try {
      const userIdentifier = userEmail.split(/@/)[0];
      const imageUploadPromises = images.map((image) => {
        return uploadEmployeeDeviceImage(image, userIdentifier);
      });
      const imageDownloadURLs = await Promise.all(imageUploadPromises);
      return imageDownloadURLs;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async deleteOldEmployeeDeviceImages(images, userEmail) {
    try {
      const imageDeletePromises = images.map((image) => {
        return deleteOldEmployeeImage(image, userEmail);
      });
      await Promise.all(imageDeletePromises);
    } catch (error) {
      console.log(error);
    }
  }

  async handleDeviceInfoSubmit(values) {
    const { chosenImageSrc, oldImageSrcs } = this.state;
    const { userEmail } = this.props;
    try {
      let updateData = { ...values };
      if (chosenImageSrc.length > 0) {
        await this.deleteOldEmployeeDeviceImages(oldImageSrcs, userEmail);
        const imageDownloadURLs = await this.uploadEmployeeDeviceImages(
          chosenImageSrc,
          userEmail
        );
        Object.assign(updateData, { oldImageSrcs: imageDownloadURLs });
      }
      await updateDeviceInfoForm(updateData, this.props.userEmail);
      toast.success("Success store device's info", {
        style: { width: "300px" },
      });
    } catch (error) {
      toast.error("Error in update device's info", {
        style: { width: "300px" },
      });
    }
  }

  clearFormInput() {
    this.setState({
      name: "",
      team: "",
      computerCompanyName: "",
      computersSeriNumber: "",
      computerConfig: "",
      screenSize: "",
      screenConfig: "",
      numberOfScreen: 0,
      mouseCompanyName: "",
      numberOfMouse: 0,
    });
  }

  async componentDidMount() {
    const userEmail = this.props.userEmail;
    try {
      const deviceInfoSnapshot = await getDeviceInfoOfEmployeeByEmail(
        userEmail
      );
      const oldDeviceInfo = deviceInfoSnapshot.data();
      this.setState({
        ...oldDeviceInfo,
        previewImages: oldDeviceInfo.oldImageSrcs,
      });
    } catch (error) {
      toast.error("Can't load old device's info", {
        style: { width: "300px" },
      });
    }
  }

  render() {
    const {
      previewImages,
      name,
      team,
      computerCompanyName,
      computersSeriNumber,
      computerConfig,
      screenSize,
      screenConfig,
      numberOfScreen,
      mouseCompanyName,
      numberOfMouse,
    } = this.state;
    return (
      <div className="form-wrapper">
        <Toaster />
        <div className="form-center-container">
          <Form
            onSubmit={this.handleDeviceInfoSubmit}
            subscription={{ submitting: true }}
            initialValues={{
              name,
              team,
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
                  <h2 className="form__title"> quản lý thiết bị</h2>
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
                        3. Tên hãng của Laptop/ PC do công ty cấp:{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        required
                        name="computerCompanyName"
                        type="text"
                        placeholder="Tên hãng PC/LapTop (Mac, Hp, Dell,...)"
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
                    <div className="device__form__input-wrapper ">
                      <label className="device__form__label">
                        4. Số seri của Laptop/ PC do công ty cấp:{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="computersSeriNumber"
                        type="text"
                        required
                        validate={this.validateRequireField}
                        placeholder="Số seri của thiết bị "
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
                        5. Cấu hình của Laptop/ PC do công ty cấp (System Name/
                        System Model/ Processor):{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="computerConfig"
                        type="text"
                        required
                        validate={this.validateRequireField}
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
                        7. Kích thước của màn hình do công ty cấp:
                      </label>
                      <Field
                        name="screenSize"
                        type="text"
                        placeholder="Kích thước màn hình (dài x rộng)"
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
                        8. Cấu hình của màn hình do công ty cấp:
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
                        9. Số lượng màn hình do công ty cấp:
                      </label>
                      <Field
                        name="numberOfScreen"
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
                          <>
                            <Input
                              {...input}
                              {...rest}
                              error={meta.error && meta.touched && !meta.active}
                              errorMsg={meta.error}
                            ></Input>
                          </>
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
                        11. Số lượng chuột máy tính do công ty cấp:
                      </label>
                      <Field
                        name="numberOfMouse"
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
                  <div
                    className="device__form__input-row"
                    style={{ flexWrap: "wrap" }}
                  >
                    <label className="device__form__label">
                      12. Ảnh chụp tình trạng hiện tại của thiết bị:
                    </label>
                    <div className="device__form__preview-wrapper">
                      {previewImages.length > 0 &&
                        previewImages.map((imgSrc) => (
                          <div className="device__form__preview" key={imgSrc}>
                            <img
                              className="device__form__preview__img"
                              alt="Preview"
                              id="image-review"
                              src={imgSrc}
                            ></img>
                          </div>
                        ))}
                    </div>
                    <input
                      className="device__form__upload-img"
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      multiple
                      onChange={this.previewChosenImages}
                    />
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
const mapStateToProps = (state) => {
  return {
    userEmail: state.auth.userEmail,
  };
};

export default connect(mapStateToProps, null)(DeviceInfoForm);
