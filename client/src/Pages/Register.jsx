import React, { useState } from 'react';
import { LuUser2 } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isEmail, isPassword } from "../Helpers/regexMatcher.js";
import { createUserAccount } from '../Redux/Slices/authSlice.js';

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ avatarUrl, setAvatarUrl ] = useState();
    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: null,
    });

    function handleAvatarUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
    
        if(uploadedImage){
            setUserData((prevData) => ({
                ...prevData, 
                avatar: uploadedImage
            }));
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function() {
                setAvatarUrl(this.result);
            });
        }
    }
    

    async function handleFormSubmit(e){
        e.preventDefault();
        if(!userData.username || !userData.name || !userData.email || !userData.password){
            toast.dismiss();
            toast.error("All fields are required !!");
            return;
        } 

        if(userData.avatar == null){
            toast.dismiss();
            toast.error("Avatar is required !!");
            return;
        }

        if(userData.username.length < 5){
            toast.error("Username should be at least 5 characters long..")
            return;
        }

        if(!isEmail(userData.email)){
            toast.dismiss();
            toast.error("Invalid Email Id");
            return;
        }

        if(!isPassword(userData.password)){
            toast.dismiss();
            toast.error("Password should be atleast 8 characters long with at least a number and a special character");
            return;
        }

        const formData = new FormData();
        formData.append("username", userData.username);
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("avatar", userData.avatar);

        console.log("URL : ", import.meta.env.VITE_BACKEND_URL);

        const response = await dispatch(createUserAccount(formData));

        if(response?.payload?.statusCode == 201){
            navigate("/");
            setUserData({
                username : "",
                name : "",
                email : "",
                password : " ",
                avatar : null
            })
            setAvatarUrl("");
        }
        
    }

    function handleStateChange(e) {
        const { name, value} = e.target;
        setUserData({
            ...userData,
            [name] :  value,
        });
    }

    return (
        <main className='flex flex-col justify-center items-center h-screen bg-gray-100'>
            <section className='border-2 border-solid border-gray-300 flex flex-col justify-center items-center rounded-xl gap-4 shadow-lg p-6 bg-white'>
                <h1 className='text-center text-blue-600 font-bold text-4xl uppercase mb-4'>Register</h1>
                <form noValidate onSubmit={handleFormSubmit} className='w-full flex flex-col items-center'>
                    <label htmlFor="imgUpload" className='flex flex-col items-center mb-4'>
                        {
                            avatarUrl ? 
                            <img src={avatarUrl} className='w-36 h-36 rounded-full object-cover'  alt="hello" />
                            : (
                                <LuUser2 className='text-[100px] rounded-full border-4 p-2 border-blue-600 hover:cursor-pointer bg-gray-200' />
                                
                            )
                        }
                        <input 
                            type="file"
                            name="avatar"
                            id="imgUpload"
                            hidden
                            onChange={handleAvatarUpload}
                        />
                    </label>
                    <div className='flex flex-wrap justify-between w-full gap-4 mb-4'>

                        <div className='flex flex-col flex-1'>
                            <label htmlFor="name" className='text-left'>Name</label>
                            <input 
                                type="text"
                                name="name"
                                placeholder='enter your name'
                                value={userData.name}
                                onChange={handleStateChange}
                                className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col flex-1'>
                            <label htmlFor="username" className='text-left'>Username</label>
                            <input 
                                type="text"
                                name="username"
                                placeholder='enter your username'
                                value={userData.username}
                                onChange={handleStateChange}
                                className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap justify-between w-full gap-4 mb-4'>
    
                        <div className='flex flex-col flex-1'>
                            <label htmlFor="email" className='text-left'>Email</label>
                            <input 
                                type="email"
                                name="email"
                                value={userData.email}
                                placeholder='enter your email'
                                onChange={handleStateChange}
                                className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col flex-1'>
                            <label htmlFor="password" className='text-left'>Password</label>
                            <input 
                                type="password"
                                name="password"
                                value={userData.password}
                                placeholder='enter a password'
                                onChange={handleStateChange}
                                className='border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit"
                        className='mt-4 bg-blue-600 text-white font-bold px-8 py-4 text-xl  rounded-lg hover:bg-blue-700 transition duration-300'
                    >
                        Register
                    </button>
                </form>
                <div>
                    <p>Already have an account ? <Link to="/login" className='text-blue-900 font-bold'>Login</Link></p>
                </div>
            </section>
        </main>
    );
}

export default Register;
