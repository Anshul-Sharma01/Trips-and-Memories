import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";


export const toggleBucketListItemThunk = createAsyncThunk("/bucket-list/toggle/:memoryId", async({memoryId}) => {
    try{
        const res = axiosInstance.get(`bucket-list/toggle/${memoryId}`);
        toast.promise(res, {
            loading : 'updating your bucket list...',
            success : (data) => data?.data?.message,
            error : "Failed to update the bucket-list"
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while toggling the bucket list item : ${err}`);
    }
})

export const getBucketListThunk = createAsyncThunk("/bucket-list/get", async() => {
    try{
        const res = axiosInstance.get("bucket-list/getall");
        toast.promise(res, {
            loading : 'Fetching your bucket list...',
            success : (data) => data?.data?.message,
            error : 'Failed to fetch your bucket list...'
        });

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching all bucket list items : ${err}`);
    }
})

export const clearBucketListThunk = createAsyncThunk("/bucket-list/clear", async() => {
    try{
        const res = axiosInstance.get("bucket-list/clear");
        toast.promise(res,{
            loading : 'Clearing your bucket list...',
            success : (data) => data?.data?.message,
            error : "Failed to clear the bucket list"
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while clearing all items from bucket-list : ${err}`);
    }
})


const bucketListSlice = createSlice({
    name : 'bucketList',
    initialState : {},
    reducers : {}
})

export default bucketListSlice.reducer;

