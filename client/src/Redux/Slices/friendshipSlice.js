import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";


export const sendFriendRequestThunk = createAsyncThunk("/friends/add/send", async({ recipientId }) => {
    try{
        const res = axiosInstance.get(`friends/request/${recipientId}`);
        toast.promise(res, {
            loading : "Sending friend request...",
            success : (data) => data?.data?.message,
            error : "Failed to send friend request !!"
        })

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while sending a friend request : ${err}`);
    }
})

export const cancelFriendRequestThunk = createAsyncThunk("/friends/", async({requestId}) => {
    try{
        const res = axiosInstance.delete(`friends/request/cancel/${requestId}`);
        toast.promise(res, {
            loading : 'Cancelling the friend request...',
            success : (data) => data?.data?.message,
            error : "Failed to cancel the friend request"
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while cancelling the friend request : ${err}`);
    }
})

export const acceptFriendRequestThunk = createAsyncThunk("/friends", async({ requestId }) => {
    try{
        const res = axiosInstance.get(`friends/accept/${requestId}`);
        toast.promise(res, {
            loading : 'Updating friends list',
            success : (data) => data?.data?.message,
            error : "Failed to accept the friend request",
        });
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while accepting the friend request : ${err}`);
    }
})

export const declineFriendRequestThunk = createAsyncThunk("/friends", async({ requestId }) => {
    try{
        const res = axiosInstance.get(`friends/decline/${requestId}`);
        toast.promise(res, {
            loading : 'Declining the friend request',
            success : (data) => data?.data?.message,
            error : "Failed to delcine the friend request"
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while declining the friend request : ${err}`);
    }
})

export const fetchPendingRequestsThunk = createAsyncThunk("/friends", async () => {
    try{
        const res = axiosInstance.get(`friends/request/pending`);
        toast.promise(res, {
            loading : 'fetching pending requests...',
            success : (data) => data?.data?.message,
            error : "Failed to fetch pending requests"
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching all pending requests : ${err}`);
    }
})

export const removeFriendThunk = createAsyncThunk("/friends/", async({ friendId }) => {
    try{
        const res = axiosInstance.get(`friends/remove/${friendId}`);
        toast.promise(res, {
            loading : "removing friend from friends list...",
            success : (data) => data?.data?.message,
            error : "Failed to remove friend from friends list"
        });

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while removing friend from friends list : ${err}`);
    }
})

export const fetchAllFriendsThunks = createAsyncThunk("/friends", async() => {
    try{
        const res = axiosInstance.get("friends/list");
        toast.promise(res, {
            loading : "fetching all friends...",
            success : (data) => data?.data?.message,
            error : "Failed to fetch all friends"
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching all friends : ${err}`);
    }
})

export const fetchSearchedUserThunk = createAsyncThunk("/friends", async({ page, limit, query }) => {
    try{
        const res = axiosInstance.get(`friends/search-query?page=${page}&limit=${limit}&query=${query}`);
        toast.promise(res, {
            loading : "Searching for user...",
            success : (data) => data?.data?.message,
            error : "Failed to search for user !!"
        })
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while fetching searched user : ${err}`);
    }
})

const friendShipSlice = createSlice({
    name : 'createSlice',
    initialState : {},
    reducers : {}
})

export default friendShipSlice.reducer;
