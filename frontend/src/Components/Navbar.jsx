import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-dark border-bottom border-body h-20  `}
        data-bs-theme="dark"
      >
        <ul
          className={`nav justify-content-end ${styles.navbar} justify-between space-x-20`}
        >
          <li className={`nav-item ${styles.box} flex-none w-64`}>
            <Link to="/" className="navbar-brand nav-link " aria-current="page">
              <h3 className="font-mono tracking-wide ml-10 ">Lost & Found</h3>
            </Link>
          </li>
          <li className={`nav-item ${styles.box}`}>
            <Link to="/" className={`nav-link `}>
              Home
            </Link>
          </li>

          <li className={`nav-item ${styles.box}`}>
            <Link to="/browselostitem" className="nav-link">
              Browse Lost Item
            </Link>
          </li>
          <li className={`nav-item ${styles.box}`}>
            <Link to="/browsefounditem" className="nav-link">
              Browse Found Item
            </Link>
          </li>
          <li className={`nav-item ${styles.box}`}>
            <Link to="/contactus" className="nav-link " aria-disabled="true">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
