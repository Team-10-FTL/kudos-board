import "./SearchBar.css";

import { useState, useEffect } from "react";

const VITE_URL = import.meta.env.VITE_URL;

const SearchBar = () => {
  const handleClearSearch = () => {
    // to do
  };

  return (
    <div>
      <input name="search-bar" type="text" placeholder="Board Title" />
      <button className="clearBtn" onClick={handleClearSearch}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
