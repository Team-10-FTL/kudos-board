import React from "react";
// import reactLogo from "../../assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import viteLogo from "/vite.svg";
import "./App.css";
import BoardPage from "../../pages/boardPage";
import HomePage from "../../pages/homePage";
import { CustomThemeProvider, useTheme } from "../UISwitch/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles"; 
import CssBaseline from '@mui/material/CssBaseline';



function AppContent() {
  const { isDarkMode } = useTheme();  // ✅ Access dark mode state
  
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',  // ✅ Dynamic theme
      primary: {
        main: isDarkMode ? '#ffffff' : '#000000',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/homepage/:id" element={<BoardPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
