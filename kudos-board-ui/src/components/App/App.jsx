import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "../Navbar/navbar"
import HomePage from '../../pages/homePage'

function App() {

  return (
    <div>
      <BrowserRouter>
      <HomePage/>
      </BrowserRouter>
    </div>
  )
}

export default App
