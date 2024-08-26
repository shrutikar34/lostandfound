import React, { useState } from "react";

export default function ImageInput() {
  const [selectedImage, setSelectedImage] = useState("./image/image.png");
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();

      // Set up the FileReader to handle the file
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update state with the image data URL
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="mb-4 d-flex justify-content-center">
        <img
          id="selectedImage"
          src={selectedImage}
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <div className="btn btn-primary btn-rounded ">
          <label className="form-label text-white m-1" htmlFor="image">
            Choose file
          </label>
          <input
            type="file"
            className="form-control d-none"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </>
  );
}
