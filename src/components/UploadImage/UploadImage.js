import React, { Component } from "react";
import { Button } from "..";
import "../styles/uploadImage.css";
import { TiDeleteOutline } from "react-icons/ti";
class UploadImage extends Component {
  render() {
    const { uploadImages, onChange, handleRemove } = this.props;
    return (
      <>
        <div className="upload-wrapper">
          {uploadImages.length > 0 &&
            uploadImages.map((imgSrc, i) => (
              <div className="upload" key={imgSrc}>
                <div
                  className="upload__remove-btn"
                  onClick={() => handleRemove(i)}
                >
                  <TiDeleteOutline></TiDeleteOutline>
                </div>
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
