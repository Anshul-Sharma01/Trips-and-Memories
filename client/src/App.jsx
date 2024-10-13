import { useState } from 'react'
import LandingPage from "./Pages/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} ></Route>
        <Route path="/auth/register" element={<Register/>} ></Route>
        <Route path='/auth/login' element={<Login/>}></Route>

      </Routes>
    </>
  )
}

export default App
