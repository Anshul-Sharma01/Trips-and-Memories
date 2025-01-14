import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
    totalUsers: null,
    totalMemories: null,
    totalLikes: null,
    totalComments: null,
    loading: false,
    error: null,
}

export const fetchUsersCount = createAsyncThunk("dashboard/fetchTotalUsers", async () => {
    const response = await axiosInstance.get("admin/fetch-users-count");
    console.log(response.data.data);
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
            });
    }
})

export default adminSlice.reducer;

