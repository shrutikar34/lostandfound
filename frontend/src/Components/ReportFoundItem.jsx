import React, { useContext, useRef } from "react";
import { context } from "./Store/Storage";

export default function ReportFoundItem() {
  const { addItem } = useContext(context);
  const founditem = useRef("");
  const description = useRef("");
  const location = useRef("");
  const date = useRef("");
  const contact = useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    const founditemvalue = founditem.current.value;
    const descriptionvalue = description.current.value;
    const locationvalue = location.current.value;
    const datevalue = date.current.value;
    const contactvalue = contact.current.value;

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:1,
        title: founditemvalue,
        description: descriptionvalue,
        location:locationvalue,
        date:datevalue,
        contact:contactvalue
       
      })
    })
    .then(res => res.json())
    .then(data => {console.log(data);addItem(data)});
    
  }

  return (
    <>
      <div className="box">
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
            <label htmlFor="date" className="form-label">
              Contact
            </label>
            <div id="date">
              <input type="number" className="form-control" ref={contact} />
            </div>
          </div>
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
