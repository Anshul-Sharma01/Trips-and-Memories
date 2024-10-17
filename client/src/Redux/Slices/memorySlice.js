import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.js";




export const createMemoryThunk = createAsyncThunk("/memory/create-memory", async(data) => {
    try{
        const res = axiosInstance.post("memory/create", data);
        toast.promise(res, {
            loading : 'Creating a new memory...',
            success : (data) => data?.data?.message,
            error : "Failed to create a new memory, please try again later !!"
        })

        return ( await res).data;
    }catch(err){
        console.error(`Error occurred while creating a new memory : ${err}`);
    }
})

export const fetchPersonalMemoriesThunk = createAsyncThunk("/memory/my", async() => {
    try{
        const res = axiosInstance.get("memory/my");
        toast.promise(res, {
            loading : 'Fetching Personal Memories',
            success : (data) => data?.data?.message,
            error : "Failed to fetch personal memories"
        })

        return (await res).data;
    }catch(err){
        console.log(`Error occurred while fetching Personal Memories : ${err}`);
    }
})

export const viewMemoryThunk = createAsyncThunk("/memory/view-memory/:memoryId", async({memoryId}) => {
    try{
        const res = axiosInstance.get(`memory/view/${memoryId}`);
        toast.promise(res, {
            loading : 'remembering memory...',
            success : (data) => data?.data?.message,
            error : "Failed to remember the memory..."
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while viewing a memory : ${err}`);
    }
})

export const fetchAllMemoriesThunk = createAsyncThunk("/memory/all", async() => {
    try{
        const res = axiosInstance.get("memory/all");
        toast.promise(res, {
            loading : 'Fetching all memories',
            success : (data) => data?.data?.message,
            error : "Failed to fetch all memories"
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching all memories : ${err}`);
    }
})

export const deleteMemoryThunk = createAsyncThunk("/memory/delete/:memoryId", async({ memoryId }) => {
    try{
        const res = axiosInstance.delete(`memory/delete/${memoryId}`);
        toast.promise(res, {
            loading : 'Forgetting the memory..',
            success : (data) => data?.data?.message,
            error : "Failed to forget the memory"
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while deleting the memory : ${err}`);
    }
})


export const updateMemoryDetailsThunk = createAsyncThunk("/memory/update-details/:memoryId", async(data) => {
    try{
        const res = axiosInstance.patch(`memory/update/${data.memoryId}`, data);
        toast.promise(res, {
            loading : 'Updating the memory...',
            success : (data) => data?.data?.message,
            error : "Failed to update the details of the memory.."
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while updating the memory details : ${err}`);
    }
})

export const updateThumbnailThunk = createAsyncThunk("/memory/update-thumbnail/:memoryId", async(data) => {
    try{
        const res = axiosInstance.patch(`memory/update-thumbnail/${data.memoryId}`, data);
        toast.promise(res, {
            loading : 'Updating the memory thumbnail...',
            success : (data) => data?.data?.message,
            error : "Failed to update the thumbnail ..."
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while updating the thumbnail : ${err}`);
    }
})

const memorySlice = createSlice({
    name : 'memory',
    initialState : {},
    reducers : {},
})




export default memorySlice.reducer;
