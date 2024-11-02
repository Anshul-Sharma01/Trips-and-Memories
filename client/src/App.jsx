import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import NotFound from './Pages/NotFound.jsx';
import Denied from "./Pages/Denied.jsx";
import Profile from "./Pages/Profile.jsx";
import ChangePassword from "./Pages/ChangePassword.jsx";
import CreateMemory from "./Pages/Memory/CreateMemory.jsx";
import PersonalMemories from "./Pages/Memory/PersonalMemories.jsx";
import AllMemories from "./Pages/Memory/AllMemories.jsx";
import ViewMemory from "./Pages/Memory/ViewMemory.jsx";
import BucketList from "./Pages/Memory/BucketList.jsx";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/forgot-password' element={<ForgotPassword />} />
        <Route path='/auth/reset/:resetToken' element={<ResetPassword />} />

        <Route path="/user/me/profile" element={<Profile/>}></Route>

        <Route path="/denied" element={<Denied />} > </Route>
        <Route path="/auth/change-password" element={<ChangePassword/>} ></Route>

        <Route path="/memory/all" element={<AllMemories/>}></Route>
        <Route path="/memory/create-memory" element={<CreateMemory/>} ></Route>
        <Route path="/memory/my" element={<PersonalMemories/>}></Route>
        <Route path="/memory/:memoryId" element={<ViewMemory/>}></Route>

        <Route path="/my-bucket-list" element={<BucketList/>}></Route>

        <Route path='*' element={<NotFound />} />


      </Routes>
    </>
  );
}

export default App;
