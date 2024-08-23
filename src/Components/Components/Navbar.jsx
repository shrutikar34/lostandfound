import React, { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <>
      <nav className="flex  md:flex-col sm:flex-row md:min-w-max  justify-cente bg-gradient-to-r from-cyan-500 to-blue-500r ">
        <ul className={`flex flex-col sm:flex-row space-x-20`}>
          <li className={`nav-item ml-4`}>
            <div className="navbar-brand nav-link  " aria-current="page">
              <h2 className=" font-serif  tracking-wide mt-4">Lost & Found</h2>
            </div>
          </li>
          <li className={`nav-item ${styles.box} mt-4 `}>
            <Link to="/" className={`nav-link `}>
              Home
            </Link>
          </li>

          <li className={`nav-item ${styles.box} mt-4`}>
            <Link to="/browselostitem" className="nav-link">
              Browse Lost Item
            </Link>
          </li>
          <li className={`nav-item ${styles.box} mt-4`}>
            <Link to="/browsefounditem" className="nav-link">
              Browse Found Item
            </Link>
          </li>
          <li className={`nav-item ${styles.box} mt-4`}>
            <Link to="/contactus" className="nav-link ">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
