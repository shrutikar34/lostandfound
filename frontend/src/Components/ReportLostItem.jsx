import React from "react";

export default function ReportLostItem() {
  return (
    <>
      <form className="box">
        <form class="row g-3">
          <div class="col-md-6">
            <label for="lostitemname" class="form-label">
              Lost Item
            </label>
            <input
              type="text"
              class="form-control"
              id="lostitemname"
              placeholder="What did you loose?"
            />
          </div>
          <div class="col-md-6">
            <label for="description" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              placeholder="Enter dome details abour your lost item ...."
            />
          </div>
          <div class="col-12">
            <label for="location" class="form-label">
              Location
            </label>
            <input
              type="text"
              class="form-control"
              id="location"
              placeholder="Where did you last see your item ?"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <div id="contact">
              <input type="number" className="form-control" />
            </div>
          </div>
          <div class="col-md-4">
            <label for="date" class="form-label">
              Date
            </label>
            <div id="date">
              <input type="date" className="form-control"></input>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary hover:bg-sky-700">
              Submit
            </button>
          </div>
        </form>
      </form>
    </>
  );
}
