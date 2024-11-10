import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";

export const createCommentThunk = createAsyncThunk("/memory/view", async({ memoryId, formData }) => {
    try{
        const res = axiosInstance.post(`comment/add/${memoryId}`, {formData} );
        toast.promise(res, {
            loading : 'creating a new comment...',
            success : (data) => data?.data?.message,
            error : "Failed to create a new comment, please try again later..."
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while creating a new comment : ${err}`);
    }
})

export const deleteCommentThunk = createAsyncThunk("/memory/view", async({ commentId }) => {
    try{
        const res = axiosInstance.delete(`comment/delete/${commentId}`);
        toast.promise(res, {
            loading : 'deleting the comment...',
            success : (data) => data?.data?.message,
            error : 'Failed to delete the comment, please try again later'
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while deleting a comment : ${err}`);
    }
})

export const fetchAllCommentsThunk = createAsyncThunk("/memory/view", async({ memoryId }) => {
    try{
        const res = axiosInstance.get(`comment/fetch/${memoryId}`);
        toast.promise(res, {
            loading : 'Fetching all comments...',
            success : (data) => data?.data?.message,
            error : "Failed to fetch all comments, please try again later..."
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching all comments : ${err}`);
    }
})


const commentSlice = createSlice({
    name : 'comment',
    initialState : {},
    reducers : {}
})


export default commentSlice.reducer;