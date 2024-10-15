import { useState } from 'react'
import LandingPage from "./Pages/LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} ></Route>
        <Route path="/auth/register" element={<Register/>} ></Route>
        <Route path='/auth/login' element={<Login/>}></Route>
        <Route path='/auth/forgot-password' element={<ForgotPassword />} ></Route>
        <Route path='/auth/reset/:resetToken' element={<ResetPassword/>}></Route>
      </Routes>
    </>
  )
}

export default App
