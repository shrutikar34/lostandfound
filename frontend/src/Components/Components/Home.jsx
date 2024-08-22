import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Body from "./Body";

export default function Home() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Body />
    </div>
  );
}
