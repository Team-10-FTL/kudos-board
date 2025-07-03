import "./FilterDropDown.css";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';

export default function FilterDropDown({handleChange}) {

    const [category, setCategory] = useState("All")
    const theme = useTheme();
    
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setCategory(selectedValue);  
        handleChange(event);       
    };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
                <InputLabel 
                    id="demo-simple-select-label"
                    sx={{ 
                        color: theme.palette.text.primary, 
                        '&.Mui-focused': {
                            color: theme.palette.text.primary,
                        }
                    }}
                >
                    Categories
                </InputLabel>        
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Categories"
                    onChange={handleSelectChange}
                    sx={{
                        color: theme.palette.text.primary,  // ✅ Text color
                        backgroundColor: theme.palette.background.paper,  // ✅ Background
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,  // ✅ Border color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                        '& .MuiSvgIcon-root': {  // ✅ Dropdown arrow
                            color: theme.palette.text.primary,
                        }
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: theme.palette.background.paper,  // ✅ Menu background
                                '& .MuiMenuItem-root': {
                                    color: theme.palette.text.primary,  // ✅ Menu item text
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover,  // ✅ Hover color
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: theme.palette.action.selected,  // ✅ Selected color
                                    }
                                }
                            }
                        }
                    }}
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
