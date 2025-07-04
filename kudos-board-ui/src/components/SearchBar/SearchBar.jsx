import "./SearchBar.css";

import { useState, useEffect } from "react";
import "./SearchBar.css"
const VITE_URL = import.meta.env.VITE_URL;

const SearchBar = ({ onChange, value, handleClearSearch }) => {
  return (
    <div className="search-container">
      <input
      className="search-bar"
        name="search-bar"
        type="text"
        placeholder="Board Title"
        value={value}
        onChange={onChange}
      />
      <button type="button" className="clearBtn" onClick={handleClearSearch}>
        Clear
      </button>
      <button type="button" className="clearBtn">Search</button>
    </div>
  );
};

export default SearchBar;
