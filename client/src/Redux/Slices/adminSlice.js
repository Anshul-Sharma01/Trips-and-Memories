import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";

const initialState = {
    totalUsers: null,
    allUsers :[],
    allMemories : [],
    categoryStats :[],
    memoryStats : [],
    locationStats : [],
    totalMemories: null,
    totalLikes: null,
    totalComments: null,
    loading: false,
    error: null,
}

export const fetchUsersCount = createAsyncThunk("dashboard/fetchTotalUsers", async () => {
    const response = await axiosInstance.get("admin/fetch-users-count");
    return response.data.data;
});

export const fetchMemoriesCount = createAsyncThunk("dashboard/fetchMemoriesCount", async () => {
    const response = await axiosInstance.get("admin/fetch-memories-count");
    return response.data.data;
});

export const fetchTotalLikes = createAsyncThunk("dashboard/fetchLikesCount", async () => {
    const response = await axiosInstance.get("admin/fetch-likes-count");
    return response.data.data;
});

export const fetchTotalComments = createAsyncThunk("dashboard/fetchCommentsCount", async () => {
    const response = await axiosInstance.get("admin/fetch-comments-count");
    return response.data.data;
});

export const fetchAllUsersThunk = createAsyncThunk("dashboard/fetch-users", async() => {
    try{
        const response = axiosInstance.get("admin/fetch-users");
        toast.promise(response, {
            loading : 'Fetching all users',
            success : (data) => data?.data?.message,
            error : "Failed to fetch users !!"
        });
        return (await response).data;
    }catch(err){
        console.error(`Error occurred while fetching all users : ${err}`);
    }
});

export const fetchAllMemoriesThunk = createAsyncThunk("dashboard/fetch-memories", async() => {
    try{
        const response = axiosInstance.get("admin/fetch-memories");
        toast.promise(response, {
            loading : 'fetching memories...',
            success : (data) => data?.data?.message,
            error : 'Failed to fetch memories !!!'
        });
        return (await response).data;
    }catch(err){
        console.error(`Error occurred while fetching all memories : ${err}`);
    }
})

export const fetchPopularLocationsThunk = createAsyncThunk("dashboard/fetch-locations", async() => {
    try{
        const response = await axiosInstance.get("admin/fetch-locations-stats");
        return response.data;
    }catch(err){
        console.error(`Error occurred while fetching popular locations : ${err}`);
    }
});

export const fetchCategoryStatsThunk = createAsyncThunk("dashboard/fetch-categories", async() => {
    try{
        const response = await axiosInstance.get("admin/fetch-category-stats");
        return response.data;
    }catch(err){
        console.error(`Error occurred while fetching category stats : ${err}`);
    }
})

export const fetchMemoryStatsThunk = createAsyncThunk("dashboard/fetch-memories-stats", async() => {
    try{
        const response = await axiosInstance.get("admin/fetch-memory-stats");
        return response.data;
    }catch(err){
        console.error(`Error occurred while fetching memories stats : ${err}`);
    }
})



const adminSlice = createSlice({
    name : "dashboard",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchUsersCount.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsersCount.fulfilled, (state, action) => {
                state.totalUsers = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsersCount.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchMemoriesCount.fulfilled, (state, action) => {
                state.totalMemories = action.payload;
            })
            .addCase(fetchTotalLikes.fulfilled, (state, action) => {
                state.totalLikes = action.payload;
            })
            .addCase(fetchTotalComments.fulfilled, (state, action) => {
                state.totalComments = action.payload;
            })
            .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
                state.allUsers = action.payload.data;
            })
            .addCase(fetchAllMemoriesThunk.fulfilled, (state, action) => {
                state.allMemories = action.payload.data;
            })
    }
})

export default adminSlice.reducer;

