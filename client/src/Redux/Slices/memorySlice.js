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



const memorySlice = createSlice({
    name : 'memory',
    initialState : {},
    reducers : {},
})




export default memorySlice.reducer;
