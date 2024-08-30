import React from "react";

export default function FoundItemsList({ founditem }) {
  return (
    <center>
      <div className="card" style={{ width: "18rem" }}>
        <img src={founditem.url} alt="Image Picture" />
        <div className="card-body">
          <h5 className="card-title">{founditem.title}</h5>
          <p className="card-text">{founditem.description}</p>
          <p className="card-text">
            <small className="text-body-secondary">{founditem.location}</small>
          </p>
          <p>
            <small className="text-body-secondary">{founditem.date}</small>
          </p>
          <div className="card">
            <div className="card-body">{founditem.contact}</div>
          </div>
        </div>
      </div>
    </center>
  );
}
