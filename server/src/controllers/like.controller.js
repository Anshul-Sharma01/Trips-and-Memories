import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../modals/like.modal.js";
import { Memory } from "../modals/memory.model";


const toggleMemoryLike = asyncHandler(async(req, res, next) => {
    try{  


    }catch(err){
        console.error(`Error occurred while toggling Memory Like : ${err}`);
        throw new ApiError(400, "Error occurred while toggling the Memory Like");
    }
})


const toggleCommentLike = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while toggling Comment like : ${err}`);
        throw new ApiError(400, "Error occurred while toggling comment Like");
    }
})


export{
    toggleMemoryLike,
    toggleCommentLike
}