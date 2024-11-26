import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    usersJournals : [],
    contributors : [],
    journalsEntries : []
}

export const createTripJournalThunk = createAsyncThunk("/create", async(journalData, { dispatch }) => {
    try{
        const res = axiosInstance.post('trip-journal/create', {
            title : journalData.title, 
            description : journalData.description
        });
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

export const fetchTripJournalEntriesThunk = createAsyncThunk("/fetch-journal-entries", async({ journalId }) => {
    try{
        const res = axiosInstance.get(`trip-journal/get/journal-entries/${journalId}`);
        toast.promise(res, {
            loading : "Fetching trip journal entires...",
            success : (data) => data?.data?.message,
            error : "Failed to fetch the trip journal entries"
        });

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching trip journal entries : ${err}`);
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
        console.log("res");

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while fetching a trip journal : ${err}`);
    }
})

export const addEntryToJournalThunk = createAsyncThunk("/add-entry", async({ journalId, formData}) => {
    try{
        const res = axiosInstance.post(`trip-journal/add-entry/${journalId}`, formData);
        toast.promise(res, {
            loading : 'Adding a new entry to journal...',
            success : (data) => data?.data?.message ,
            error : 'Failed to add a new entry to journal'
        });
        return (await res).data;

    }catch(err){
        console.error(err?.message || `Error occurred while adding an entry to trip journal : ${err}`);
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

export const deleteJournalThunk = createAsyncThunk("/delete-journal", async({ journalId }, { dispatch }) => {
    try{
        const res = axiosInstance.delete(`trip-journal/d/${journalId}`);
        toast.promise(res, {
            loading : "Deleting the requested journal..",
            success : (data) => data?.data?.message,
            error : "Failed to delete the journal !!"
        });

        await dispatch(fetchUserTripJournalsThunk());

        return (await res).data;

    }catch(err){
        console.error(`Error occurred while deleting the journal : ${err}`);
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
                // console.log("redux : ", state.usersJournals);
            })
            .addCase( manageContributorsThunk.fulfilled, (state, action) => {
                state.contributors = action?.payload?.data;
            })
            .addCase(fetchTripJournalEntriesThunk.fulfilled, (state, action) => {
                state.journalsEntries = action?.payload?.data?.entries;
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
            .addCase(closeJournalThunk.fulfilled, (state, action) => {
                const closedJournalId = action?.payload?.data?._id;
                const journal = state.usersJournals.find(journal => journal._id === closedJournalId);
                if (journal) {
                    journal.status = "closed";
                }
            })
            
    }
})


export default tripJournalSlice.reducer;
