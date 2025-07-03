import React from "react";
// import reactLogo from "../../assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import viteLogo from "/vite.svg";
import "./App.css";
import BoardPage from "../../pages/BoardPage";
import HomePage from "../../pages/homePage";
import { CustomThemeProvider } from "../UISwitch/ThemeContext.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles"; 



const muiTheme = createTheme({  // ✅ Create MUI theme object
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <CustomThemeProvider>
      <ThemeProvider theme={muiTheme}>
          <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/homepage/:id" element={<BoardPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>

    </CustomThemeProvider>

  );
}

export default App;
