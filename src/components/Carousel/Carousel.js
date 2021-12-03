import React, { useEffect, useState } from "react";
import "../styles/carousel.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classNames from "classnames";

function Carousel({ imageSrcs }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);

  const controlNavigationButtonActiveness = (imgIndex) => {
    if (imgIndex === 0) {
      setDisablePrevBtn(true);
      setDisableNextBtn(false);
      return;
    } else if (imgIndex === imageSrcs.length - 1) {
      setDisableNextBtn(true);
      setDisablePrevBtn(false);
      return;
    }
    setDisablePrevBtn(false);
    setDisableNextBtn(false);
  };

  const navigateImage = (step) => {
    const currentImgIndex = selectedIndex + step;
    if (currentImgIndex < 0 || currentImgIndex >= imageSrcs.length) {
      return;
    }
    controlNavigationButtonActiveness(currentImgIndex);
    setSelectedIndex((prevState) => prevState + step);
  };

  //unnecessary navigation buttons when has only one image
  useEffect(() => {
    if (imageSrcs.length === 1) {
      setDisableNextBtn(true);
    }
  }, [imageSrcs.length]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel__main">
        {!disablePrevBtn && (
          <button
            className="carousel__control carousel__control__left-btn"
            onClick={() => navigateImage(-1)}
            disabled={disablePrevBtn}
          >
            <IoIosArrowBack className="carousel__control__icon" />
          </button>
        )}
        <div className="carousel__main-image-container">
          <img
            src={imageSrcs[selectedIndex]}
            alt="device"
            className="carousel__main-image"
          />
        </div>
        {!disableNextBtn && (
          <button
            className="carousel__control carousel__control__right-btn"
            onClick={() => navigateImage(1)}
            disabled={disableNextBtn}
          >
            <IoIosArrowForward className="carousel__control__icon" />
          </button>
        )}
      </div>
      <div className="carousel__image-list">
        {imageSrcs.map((_, i) => (
          <div
            key={i}
            className={classNames("carousel__image-dot", {
              "carousel__image-dot--active": i === selectedIndex,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default Carousel;
