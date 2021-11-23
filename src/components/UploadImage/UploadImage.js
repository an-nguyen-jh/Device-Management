import React, { Component } from "react";
import { Button } from "..";
import "../styles/uploadImage.css";

class UploadImage extends Component {
  render() {
    const { uploadImages, onChange } = this.props;
    return (
      <>
        <div className="upload-wrapper">
          {uploadImages.length > 0 &&
            uploadImages.map((imgSrc) => (
              <div className="upload" key={imgSrc}>
                <img
                  className="upload__img"
                  alt="Preview"
                  id="image-review"
                  src={imgSrc}
                ></img>
              </div>
            ))}
        </div>
        <div className="upload__btn-wrapper">
          <Button type="submit" color="secondary">
            Upload images
          </Button>

          <input type="file" name="myfile" multiple onChange={onChange} />
        </div>
      </>
    );
  }
}
export default UploadImage;
