import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import NotFound from './Pages/NotFound.jsx';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        <Route path='/auth/reset/:resetToken' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
