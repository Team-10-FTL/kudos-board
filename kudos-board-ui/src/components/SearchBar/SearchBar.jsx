import "./SearchBar.css";

import { useState, useEffect } from "react";

const VITE_URL = import.meta.env.VITE_URL;

const SearchBar = ({onChange, value}) => {
  const handleClearSearch = () => {
    // to do
  };

  return (
    <div>
      <input name="search-bar" type="text" placeholder="Board Title" value={value} onChange={onChange}/>
      <button className="clearBtn" onClick={handleClearSearch}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
