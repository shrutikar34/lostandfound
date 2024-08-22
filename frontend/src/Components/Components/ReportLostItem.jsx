import React, { useContext, useRef } from "react";
import { context } from "./Store/Storage";
export default function ReportLostItem() {
  const { add_Item_Lost } = useContext(context);
  const lostitem = useRef("");
  const description = useRef("");
  const location = useRef("");
  const date = useRef("");
  const contact = useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    const lostitemvalue = lostitem.current.value;
    const descriptionvalue = description.current.value;
    const locationvalue = location.current.value;
    const datevalue = date.current.value;
    const contactvalue = contact.current.value;

    fetch("http://localhost:3000/postslost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        title: lostitemvalue,
        description: descriptionvalue,
        location: locationvalue,
        date: datevalue,
        contact: contactvalue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        add_Item_Lost(data);
      });
  }
  return (
    <>
      <div className="box shadow w-auto ">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="lostitemname" className="form-label">
              Lost Item
            </label>
            <input
              type="text"
              className="form-control"
              id="lostitemname"
              placeholder="What did you loose?"
              ref={lostitem}
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
              placeholder="Enter dome details abour your lost item ...."
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
              placeholder="Where did you last see your item ?"
              ref={location}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <div id="contact">
              <input type="number" className="form-control" ref={contact} />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div id="date">
              <input type="date" className="form-control" ref={date}></input>
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
