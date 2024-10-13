import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";



const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") === "true",
    userRole : localStorage.getItem("userRole") !== undefined ? localStorage.getItem("userRole") : " ",
    userData : JSON.parse(localStorage.getItem("userData")) !== undefined ? JSON.parse(localStorage.getItem("userData")) : {},
};


export const createUserAccount = createAsyncThunk("/auth/register", async(data) => {
    try{
        const res = axiosInstance.post("users/register", data);
        toast.promise(res, {
            loading : " Creating your account..",
            success : (data) => data?.data?.message,
            error : "Failed to create a new account !!"
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred in creating new account : ${err}`);
    }
})

export const authenticateUser = createAsyncThunk("/auth/login", async(data) => {
    try{
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading : "Authenticating your credentials...",
            success : (data) => data?.data?.message,
            error : "Failed to authenticate the credentials !!"
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while authenticating the user : ${err}`);
    }
})

export const logoutUserAccount = createAsyncThunk("/auth/logout", async() => {
    try{
        const res = axiosInstance.get("users/logout");
        toast.promise(res, {
            loading : "Logging out...",
            success : (data) => data?.data?.message,
            error : "Failed to log out !!"
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while logging out the user : ${err}`);
    }
})


const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(createUserAccount.fulfilled, (state, action) => {
            if(action?.payload?.statusCode === 201){
                const user = action?.payload?.data?.user;
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userRole", user?.role);

                state.isLoggedIn = true;
                state.userData = user;
                state.userRole = user?.role;
            }
        })
        .addCase(createUserAccount.rejected, (state, action) => {
            localStorage.clear();
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = "";
        })
        .addCase(authenticateUser.fulfilled, (state, action) => {
            if(action?.payload?.statusCode === 200){
                const user = action?.payload?.data?.user;
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userRole", user?.role);

                state.isLoggedIn = true;
                state.userData = user;
                state.userRole = user?.role;
            }
        })
        .addCase(authenticateUser.rejected, (state) => {
            localStorage.clear();
            state.userData = {},
            state.isLoggedIn = false;
            state.userRole = "";
        })
        .addCase(logoutUserAccount.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 200) {
                localStorage.clear();
                state.isLoggedIn = false;
                state.userData = {};
                state.userRole = "";
            }
        })
    }
})

export default authSlice.reducer;
