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

import UpdateMemoryThumbnail from "./Components/Memory/UpdateMemoryThumbnail.jsx";
import UpdateMemoryDetails from "./Components/Memory/UpdateMemoryDetails.jsx";
import DeleteMemoryModal from "./Components/Memory/DeleteMemoryModal.jsx";
import ToggleBucketList from "./Components/BucketList/ToggleBucketList.jsx";
import BucketList from "./Pages/BucketList/BucketList.jsx";
import Comment from "./Components/Comments/Comment.jsx";
import CommentsSection from "./Components/Comments/CommentsSection.jsx";
import DeleteComment from "./Components/Comments/DeleteComment.jsx";
import ToggleLike from "./Components/Like/ToggleLike.jsx";
import Friend from "./Components/Friends/Friend.jsx";
import FriendProfile from "./Pages/Friends/FriendProfile.jsx";
import AllFriends from "./Pages/Friends/AllFriends.jsx";


function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/modal/check" element={<AllFriends/>}></Route>
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
