import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import memorSliceReducer from "./Slices/memorySlice.js";
import bucketListReducer from "./Slices/bucketListSlice.js";
import commentReducer from './Slices/commentSlice.js';
import likeReducer from "./Slices/likeSlice.js";
import friendReducer from "./Slices/friendshipSlice.js";
import recommReducer from "./Slices/recommSlice.js";


const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        memory : memorSliceReducer,
        bucketList : bucketListReducer,
        comment : commentReducer,
        like : likeReducer,
        friendship : friendReducer,
        recomm : recommReducer
    }
})


export default store;
