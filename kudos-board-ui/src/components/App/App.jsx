import  React  from 'react'
import reactLogo from '../../assets/react.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from '../../pages/homePage'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
