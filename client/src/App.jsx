import { useState } from 'react'
import LandingPage from "./Pages/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import Register from './Pages/Register.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} ></Route>
        <Route path="/auth/register" element={<Register/>} ></Route>

      </Routes>
    </>
  )
}

export default App
