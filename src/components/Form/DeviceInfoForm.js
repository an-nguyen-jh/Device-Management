import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import { Input } from "..";
import { getDeviceInfoOfUserByEmail } from "../../apiService";
import { Button } from "../index";
import "../styles/form.css";
import { connect } from "react-redux";

const teamOptions = ["Sweet Cake", "Yin Yang", "Designer", "Admin"];

class DeviceInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgSource: [],
      previewImages: [],
      name: "",
      team: "",
      computerCompanyName: "",
      computersSeriNumber: "",
      computerConfig: "",
      screenSize: "",
      screenConfig: "",
      numberOfScreen: "",
      mouseCompanyName: "",
      numberOfMouse: "",
    };
    this.hanldeChooseImages = this.previewChosenImages.bind(this);
    this.handleDeviceInfoSubmit = this.handleDeviceInfoSubmit.bind(this);
  }

  previewChosenImages = async (e) => {
    if (e.target.files.length > 0) {
      const images = Array.from(e.target.files);
      this.setState({
        previewImgSource: images,
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
    }
  };

  async handleDeviceInfoSubmit(values) {}

  async componentDidMount() {
    const userEmail = this.props.userEmail;
    try {
      const deviceInfoSnapshot = await getDeviceInfoOfUserByEmail(userEmail);
      const oldDeviceInfo = deviceInfoSnapshot.data();
      this.setState({
        ...oldDeviceInfo,
      });
    } catch (error) {
      //notice error
    }
  }

  render() {
    const { previewImages } = this.state;
    return (
      <div className="form-wrapper">
        <div className="form-center-container">
          <Form
            onSubmit={this.handleDeviceInfoSubmit}
            subscription={{ submitting: true }}
            initialValues={{ ...this.state }}
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
                        3. Tên hãng của Laptop/ PC do công ty cấp:{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        required
                        name="computerCompanyName"
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
                        4. Số seri của Laptop/ PC do công ty cấp:{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="computersSeriNumber"
                        type="text"
                        required
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
                        System Model/ Processor):{" "}
                        <span className="device__form__input-required">*</span>
                      </label>
                      <Field
                        name="computerConfig"
                        type="text"
                        required
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
                        placeholder="Kích thước màn hình (dài x rộng)"
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
                        min="0"
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
                        min="0"
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
                  <div
                    className="device__form__input-row"
                    style={{ flexWrap: "wrap" }}
                  >
                    {previewImages.length > 0 &&
                      previewImages.map((imgSrc) => (
                        <img
                          key={imgSrc}
                          className="device__form__preview-img"
                          alt="Preview"
                          id="image-review"
                          src={imgSrc}
                        ></img>
                      ))}
                    <Field name="file" className="device__form__upload-img">
                      {({ input: { value, onChange, ...input }, ...rest }) => (
                        // do not re-assign value for input type="file"
                        <input
                          {...input}
                          {...rest}
                          accept=".png, .jpg, .jpeg"
                          type="file"
                          multiple
                          onChange={(e) => {
                            onChange(e.target.files);
                            this.previewChosenImages(e);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="form__split-bar"></div>
                  <div className="device__form__btn-group">
                    <Button type="submit" color="primary" disabled={submitting}>
                      Submit
                    </Button>
                    <Button variant="text"> Clear Form </Button>
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
