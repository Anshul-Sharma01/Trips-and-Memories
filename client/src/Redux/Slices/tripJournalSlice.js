import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    usersJournals : [],
    contributors : [],
    journalsEntries : []
}

export const createTripJournalThunk = createAsyncThunk("/create", async(data, { dispatch }) => {
    try{
        const res = axiosInstance.post('trip-journal/create', data);
        toast.promise(res, {
            loading : 'Creating a new trip journal',
            success : (data) => data?.data?.message,
            error : "Failed to create a journal"
        })

        await dispatch(fetchUserTripJournalsThunk());

        return (await res).data;
    }catch(err){
        console.error(`Error occurred while creating trip journal : ${err}`);
    }
})

export const fetchUserTripJournalsThunk = createAsyncThunk("/fetch-my", async () => {
    try{
        const res = axiosInstance.get("trip-journal/fetch/my");
        toast.promise(res, {
            loading : 'Fetching user trip journals...',
            success : (data) => data?.data?.message,
            error : 'Error occurred while fetching your time journals !!'
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching user trip journals  : ${err}`);
    }
})

export const fetchTripJournalDetailsThunk = createAsyncThunk("/fetch", async({ journalId }) => {
    try{    
        const res = axiosInstance.get(`trip-journal/get/${journalId}`);
        toast.promise(res, {
            loading : 'fetching a trip journal',
            success : (data) => data?.data?.message,
            error : 'Failed to get trip journal details !!'
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching a trip journal : ${err}`);
    }
})

export const addEntryToJournalThunk = createAsyncThunk("/add-entry", async({ journalId, content }) => {
    try{
        const res = axiosInstance.post(`trip-journal/add-entry/${journalId}`, { content });
        toast.promise(res, {
            loading : 'Adding a new entry to journal...',
            success : (data) => data?.data?.message ,
            error : 'Failed to add a new entry to journal'
        });
        return (await res).data;

    }catch(err){
        console.error(`Error occurred while adding an entry to trip journal : ${err}`);
    }
})

export const updateJournalEntryThunk = createAsyncThunk("/update-entry", async({ journalId, entryId, content }) => {
    try{
        const res = axiosInstance.patch(`trip-journal/update-entry/${journalId}/${entryId}`, { content });

        toast.promise(res, {
            loading : 'updating journal entry...',
            success : (data) => data?.data?.message,
            error : 'Failed to update the journal entry'
        })

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while updating journal entry : ${err}`);
    }
})

export const deleteJournalEntryThunk = createAsyncThunk("/delete-entry", async({ journalId, entryId }) => {
    try{
        const res = axiosInstance.delete(`trip-journal/${journalId}/${entryId}`);
        toast.promise(res, {
            loading : 'Deleting journal entry....',
            success : (data) => data?.data?.message,
            error : 'Failed to delete this entry !!'
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while deleting journal entry : ${err}`);
    }
})

export const closeJournalThunk = createAsyncThunk("/close-journal", async({ journalId }, { dispatch }) => {
    try{
        const res = axiosInstance.get(`trip-journal/close/${journalId}`);
        toast.promise(res, {
            loading : 'closing this trip journal',
            success : (data) => data?.data?.message,
            error : "Failed to close this trip journal"
        });

        await dispatch(fetchUserTripJournalsThunk());
        
        return (await res).data;

    }catch(err){
        console.error(`Error occurred while closing trip journal : ${err}`);
    }
}) 

export const manageContributorsThunk = createAsyncThunk("/manage-contributors", async({ journalId, contributors }) => {
    try{
        const res = axiosInstance.patch(`trip-journal/manage/contributors/${journalId}`, {contributors});
        toast.promise(res, {
            loading : 'Updating Contributors list..',
            success : (data) => data?.data?.message,
            error :'Failed to update the contributors list !!'
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while managing contributors : ${err}`);
    }
})


const tripJournalSlice = createSlice({
    name : "tripJournal",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchUserTripJournalsThunk.fulfilled, (state, action) => {
                state.usersJournals = action?.payload?.data;
            })
            .addCase( manageContributorsThunk.fulfilled, (state, action) => {
                state.contributors = action?.payload?.data;
            })
            .addCase(addEntryToJournalThunk.fulfilled, (state, action) => {
                state.journalsEntries = action?.payload?.data;
            })
            .addCase(deleteJournalEntryThunk.fulfilled, (state, action) => {
                state.journalsEntries = action?.payload?.data;
            })
            .addCase(updateJournalEntryThunk.fulfilled, (state, action) => {
                state.journalsEntries = action?.payload?.data;
            })
    }
})


export default tripJournalSlice.reducer;
