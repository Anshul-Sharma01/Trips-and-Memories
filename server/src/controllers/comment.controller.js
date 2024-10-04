import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler.js";



const addComment = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while adding a new comment : ${err}`);
        throw new ApiError(400,err?.message ||  "Error occurred while adding a new comment")
    }
})

const deleteComment = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while deleting a comment : ${err}`);
        throw new ApiError(400, err?.message ||  "Error occurred while deleting a comment");
    }
})

const fetchAllComments = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching all comments for a particular memory : ${err}`);
    }
})



export { 
    addComment,
    deleteComment,
    fetchAllComments
}



