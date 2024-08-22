import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";
export default function SearchBar() {
  return (
    <div>
      <div
        className={`input-group  ${styles.searchbar}`}
        style={{ width: "50%" }}
      >
        <input
          type="search"
          className="form-control shadow"
          placeholder="Search...."
        />
        <span className="input-group-text" id="basic-addon2">
          <CiSearch />
        </span>
      </div>
    </div>
  );
}
