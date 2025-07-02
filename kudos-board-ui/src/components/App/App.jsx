import React from "react";
// import reactLogo from "../../assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import viteLogo from "/vite.svg";
import "./App.css";
import BoardPage from "../../pages/BoardPage";
import HomePage from "../../pages/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage/:id" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
