import React, { useEffect, useState, useRef } from "react";
import "../styles/employeeDeviceDetail.css";
import { IoIosArrowBack } from "react-icons/io";
import { generateAvatarByName } from "../../utils/generateAvatar";
import { Button, Carousel, Input, UploadImage } from "..";
import { Field, Form } from "react-final-form";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { validate as uuidValidate, version as uuidVersion } from "uuid";
import {
  getDeviceInfoOfEmployeeById,
  signout,
  updateEmployeeDeviceInfo,
} from "../../apiService";
import toast from "react-hot-toast";
import { getCurrentPathWithoutLastPart } from "../../utils/routerHandler";
import {
  deleteEmployeeOldDeviceImages,
  uploadEmployeeDeviceImages,
} from "../../utils/manageImage";
import { authenticationAction, confirmDialogAction } from "../../store/actions";
import { useDispatch } from "react-redux";

function EmployeeDeviceDetail() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTeam, setEmployeeTeam] = useState("");
  const [createdTime, setCreatedTime] = useState(null);
  const [updatedTime, setUpdatedTime] = useState(null);
  const [imageSrcs, setImageSrcs] = useState([]);
  const [computerCompanyName, setComputerCompanyName] = useState("");
  const [computersSeriNumber, setComputersSeriNumber] = useState("");
  const [computerConfig, setComputerConfig] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [screenConfig, setScreenConfig] = useState("");
  const [numberOfScreen, setNumberOfScreen] = useState("");
  const [mouseCompanyName, setMouseCompanyName] = useState("");
  const [numberOfMouse, setNumberOfMouse] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [chosenImageSrcs, setChosenImageSrcs] = useState([]);
  const [reloadPage, setReloadPage] = useState(Math.random());
  const formRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const validateRequireField = (value) => {
    return value && value.length > 0 ? undefined : "This field is required";
  };

  const validateNumberOfDevice = (value) => {
    return value >= 0 ? undefined : "Number of device must be positive";
  };

  const goBackToItemListPage = () => {
    const parentPath = getCurrentPathWithoutLastPart(location.pathname);
    history.push(parentPath);
  };

  const checkDataPrimitiveness = () => {
    const { dirty: isValuesChange } = formRef.current.getState();
    return isValuesChange;
  };

  const checkUnsavedChange = () => {
    const isChange = checkDataPrimitiveness();
    if (isChange) {
      return window.confirm("You has unsaved change. Do you want to save it?");
    }
    return false;
  };

  const returnToItemDetailsPage = () => {
    let hasUnsavedChange = checkUnsavedChange();
    if (hasUnsavedChange) {
      return;
    }
    goBackToItemListPage();
  };

  const signOut = async () => {
    try {
      let hasUnsavedChange = checkUnsavedChange();
      if (hasUnsavedChange) {
        return;
      }
      await signout();
      dispatch(authenticationAction.removeUserAuthenticationInfo());
    } catch (error) {}
  };

  const previewChosenImages = async (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const images = Array.from(e.target.files);
    setChosenImageSrcs(images);
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
      setPreviewImages(previewImageURIs);
    } catch (error) {
      //ignore error
    }
  };

  const handleDeleteDeviceInfo = (e) => {
    e.preventDefault();
    dispatch(
      confirmDialogAction.visible({
        name: employeeName,
        email: employeeEmail,
        imageSrcs,
        callback: goBackToItemListPage,
      })
    );
  };

  const handleUpdateDeviceInfo = async (values) => {
    const updatedData = {
      computer: {
        companyName: values.computerCompanyName,
        config: values.computerConfig,
        seriNumber: values.computersSeriNumber,
      },
      mouse: {
        companyName: values.mouseCompanyName,
        numberOf: values.numberOfMouse,
      },

      screen: {
        config: values.screenConfig,
        numberOf: values.numberOfScreen,
        size: values.screenSize,
      },
      updatedTime: new Date(),
    };

    try {
      if (chosenImageSrcs.length > 0) {
        await deleteEmployeeOldDeviceImages(imageSrcs);
        const imageDownloadURLs = await uploadEmployeeDeviceImages(
          chosenImageSrcs,
          employeeEmail
        );
        Object.assign(updatedData, { imageSrcs: imageDownloadURLs });
      }
      await updateEmployeeDeviceInfo(updatedData, employeeEmail);
      setReloadPage(Math.random());
      setChosenImageSrcs([]);
      setPreviewImages([]);
      toast.success("Successful update employee's device information", {
        className: "toast-notification",
      });
    } catch (error) {
      toast.error("Can not get employee's device information", {
        className: "toast-notification",
      });
    }
  };

  useEffect(() => {
    const isValidUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isValidUuid) {
      history.goBack();
    }
  }, [history, id]);

  useEffect(() => {
    (async () => {
      try {
        const deviceInfoSnapShots = await getDeviceInfoOfEmployeeById(id);
        let deviceInfo;
        //only run once
        deviceInfoSnapShots.forEach((deviceInfoSnap) => {
          deviceInfo = { email: deviceInfoSnap.id, ...deviceInfoSnap.data() };
        });

        setEmployeeEmail(deviceInfo.email);
        setEmployeeName(deviceInfo.name);
        setEmployeeTeam(deviceInfo.team);
        setCreatedTime(deviceInfo.createdTime.toDate());
        setUpdatedTime(deviceInfo.updatedTime.toDate());
        setImageSrcs(deviceInfo.imageSrcs);
        setComputerCompanyName(deviceInfo.computer.companyName);
        setComputerConfig(deviceInfo.computer.config);
        setComputersSeriNumber(deviceInfo.computer.seriNumber);
        setMouseCompanyName(deviceInfo.mouse.companyName);
        setNumberOfMouse(deviceInfo.mouse.numberOf);
        setNumberOfScreen(deviceInfo.screen.numberOf);
        setScreenSize(deviceInfo.screen.size);
        setScreenConfig(deviceInfo.screen.config);
      } catch (error) {
        toast.error("Can not get employee's device information", {
          className: "toast-notification",
        });
      }
    })();
  }, [id, reloadPage]);

  return (
    <div className="device-detail-wrapper">
      <div className="device-detail__navigation">
        <div
          className="device-detail__navigation__go-back"
          onClick={returnToItemDetailsPage}
        >
          <IoIosArrowBack />
          <span>Back</span>
        </div>
        <div className="device-detail__navigation__title">Item Details</div>
        <Button
          variant="text"
          className="device-detail__navigation__sign-out"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>
      <div className=" container-fluid device-detail">
        <div className="device-detail__employee">
          <div className=" device-detail__employee__avatar">
            {generateAvatarByName(employeeName)}
          </div>
          <p className="device-detail__employee__name">{employeeName}</p>
          <p className="device-detail__employee__email">{employeeEmail}</p>
          <p className="device-detail__employee__team">{employeeTeam}</p>
        </div>
        <div className="device-detail__info">
          <h2 className="form__title">Employee's Device Information</h2>
          <div className="device-detail__time-wrapper">
            <div className="device-detail__time">
              Create Time: {createdTime && createdTime.toLocaleDateString()}
            </div>
            <div className="device-detail__time">
              Update Time: {updatedTime && updatedTime.toLocaleDateString()}
            </div>
          </div>
          <div className="form__split-bar"></div>
          {imageSrcs.length > 0 && <Carousel imageSrcs={imageSrcs}></Carousel>}
          <Form
            onSubmit={handleUpdateDeviceInfo}
            subscription={{
              submitting: true,
            }}
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
            {({ handleSubmit, submitting, form }) => {
              formRef.current = form;
              return (
                <form onSubmit={handleSubmit} className="device__form">
                  <div className="device__form__input-row">
                    <div className="device__form__input-wrapper">
                      <label className="device__form__label">
                        Brand name of Laptop/PC provided by company:
                        <span className="device__form__input-required">*</span>
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
                        <span className="device__form__input-required">*</span>
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
                        <span className="device__form__input-required">*</span>
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
                              error={meta.error && meta.touched && !meta.active}
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
                  <div
                    className="device__form__input-row"
                    style={{ flexWrap: "wrap" }}
                  >
                    <label className="device__form__label">
                      Picture of employee's device: (upload new im ages will
                      delete all old images)
                    </label>
                    <UploadImage
                      uploadImages={previewImages}
                      onChange={previewChosenImages}
                    ></UploadImage>
                  </div>
                  <div className="form__split-bar"></div>
                  <div className="device__form__btn-group">
                    <Button type="submit" color="primary" disabled={submitting}>
                      Submit
                    </Button>
                    <Button
                      variant="text"
                      color="danger"
                      onClick={handleDeleteDeviceInfo}
                    >
                      Delete
                    </Button>
                  </div>
                </form>
              );
            }}
          </Form>
        </div>
      </div>
    </div>
  );
}
export default EmployeeDeviceDetail;
