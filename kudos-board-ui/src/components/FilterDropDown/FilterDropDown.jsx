import "./FilterDropDown.css";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function FilterDropDown({ handleChange }) {
  const [category, setCategory] = useState("All");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);
    handleChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Categories"
          onChange={handleSelectChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Recent"}>Recent</MenuItem>
          <MenuItem value={"Celebration"}>Celebration</MenuItem>
          <MenuItem value={"Thank You"}>Thank You</MenuItem>
          <MenuItem value={"Inspiration"}>Inspiration</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
