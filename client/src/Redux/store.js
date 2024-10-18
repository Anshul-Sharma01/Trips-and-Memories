import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import memorSliceReducer from "./Slices/memorySlice.js";
import bucketListReducer from "./Slices/bucketListSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        memory : memorSliceReducer,
        bucketList : bucketListReducer,
    }
})


export default store;
