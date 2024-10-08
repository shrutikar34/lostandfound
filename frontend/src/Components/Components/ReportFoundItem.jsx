import React, { useContext, useRef, useState } from "react";
import { context } from "./Store/Storage";
import { useNavigate } from "react-router-dom";
import ImageInput from "./ImageInput";

export default function ReportFoundItem() {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (dataUrl) => {
    setImageSrc(dataUrl);
  };

  const { addItem } = useContext(context);
  const navigate = useNavigate();

  const founditem = useRef("");
  const description = useRef("");
  const location = useRef("");
  const date = useRef("");
  const contact = useRef("");
  const category = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const founditemvalue = founditem.current.value;
    const descriptionvalue = description.current.value;
    const locationvalue = location.current.value;
    const datevalue = date.current.value;
    const contactvalue = contact.current.value;
    const categoryvalue = category.current.value;

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        title: founditemvalue,
        description: descriptionvalue,
        location: locationvalue,
        date: datevalue,
        contact: contactvalue,
        category: categoryvalue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        addItem(data);
        navigate("/browsefounditem");
      });
  }

  return (
    <>
      <div className="box w-auto shadow">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="lostitemname" className="form-label">
              Found Item
            </label>
            <input
              type="text"
              className="form-control"
              id="lostitemname"
              placeholder="What did you find?"
              ref={founditem}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter dome details abour the found item ...."
              ref={description}
            />
            <div className="col-md-6">
              <label htmlFor="Category" className="form-label mt-2">
                Category
              </label>
              <select className="form-select" ref={category}>
                <option>Select category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="documents">Documents</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Where did you find the item ?"
              ref={location}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div id="date">
              <input type="date" className="form-control" ref={date} />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <div id="contact">
              <input type="tel" className="form-control" ref={contact} />
            </div>
          </div>
          <ImageInput onImageChange={handleImageChange} />
          <div className="col-12">
            <button type="submit" className="btn btn-primary hover:bg-sky-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
