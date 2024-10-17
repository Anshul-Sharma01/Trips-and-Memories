import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import memorSliceReducer from "./Slices/memorySlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        memory : memorSliceReducer
    }
})


export default store;
