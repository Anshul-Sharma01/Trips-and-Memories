
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleBucketListItem = asyncHandler(async( req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while toggling the bucketList item : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while toggling the Bucket List Item");
    }
})


const clearBucketList = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while clearing bucket list : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while clearing the Bucket List");
    }
})

const getAllBucketListItems = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching all bucket list items : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching all Bucket List items");
    }
})

export{
    toggleBucketListItem,
    clearBucketList,
    getAllBucketListItems
}

