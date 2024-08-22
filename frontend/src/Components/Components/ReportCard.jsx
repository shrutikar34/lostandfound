import React from "react";
import { Link } from "react-router-dom";

export default function ReportCard({ title, body, link }) {
  return (
    <div>
      <div className="card shadow " style={{ width: "18rem" }}>
        <div className="card-body ">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <Link
            to={`/${link}`}
            className="card-link text-sky-400 underline decoration-sky-500  hover:text-purple-600"
          >
            {link.toUpperCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}
