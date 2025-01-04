
import { User } from "../models/user.model.js";
import { Memory } from "../models/memory.model.js";
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";


const fetchAllUsers = asyncHandler(async(req, res, next) => {
    try{
        const allUsers = await User.find({});
        if(allUsers.length == 0){
            throw new ApiError(404, "No users found.");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allUsers,
                "Successfully fetched all Users !!"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching all users : ${err}`);
    }
})

const fetchUsersCount = asyncHandler(async(req, res, next) => {
    try{
        
        const allUsers = await User.find({}).countDocuments();
        if(allUsers.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    0,
                    "No user found"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allUsers,
                "Successfully fetched all users count !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching users count : ${err}`);
    }
})   

const fetchUserById = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.params.userId;
        if(!isValidObjectId(userId)){
            throw new ApiError(400, "Invalid user id");
        }

        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(404, "User not found");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Successfully fetched user by id !!"
            )
        )   


    }catch(err){
        console.error(`Error occurred while fetching user by id : ${err}`);
    }
})

const updateUserById = asyncHandler(async(req, res, next) => {  
    try{

    }catch(err){
        console.error(`Error occurred while updating user by id : ${err}`);
    }
})

const deleteUserById = asyncHandler(async(req, res, next) => {  
    try{

    }catch(err){
        console.error(`Error occurred while deleting user by id : ${err}`);
    }
})

const fetchMemoriesCount = asyncHandler(async(req, res, next) => {
    try{

        const allMemories = await Memory.find({}).countDocuments();
        if(allMemories.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    0,
                    "No memories found"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allMemories,
                "Successfully fetched all memories count !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching memories count : ${err}`);
    }
})

const fetchMemories = asyncHandler(async(req, res, next) => {
    try{

        const allMemories = await Memory.find({});
        if(allMemories.length == 0){
            throw new ApiError(404, "No memories found.");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allMemories,
                "Successfully fetched all Memories !!"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching memories : ${err}`);
    }
})

const fetchMemoryById = asyncHandler(async(req, res, next) => { 
    try{

        const memoryId = req.params.memoryId;
        if(!isValidObjectId(memoryId)){
            throw new ApiError(400, "Invalid memory id");
        }

        const memory = await Memory.findById(memoryId);
        if(!memory){
            throw new ApiError(404, "Memory not found");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                memory,
                "Successfully fetched memory by id !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching memory by id : ${err}`);
    }
})

const updateMemoryById = asyncHandler(async(req, res, next) => {  
    try{

    }catch(err){
        console.error(`Error occurred while updating memory by id : ${err}`);
    }
})

const deleteMemoryById = asyncHandler(async(req, res, next) => {    
    try{

    }catch(err){
        console.error(`Error occurred while deleting memory by id : ${err}`);
    }
})

const fetchCommentsCount = asyncHandler(async(req, res, next) => {
    try{

        const allComments = await Comment.find({}).countDocuments();
        if(allComments.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    0,
                    "No comments found"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allComments,
                "Successfully fetched all comments count !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching comments count : ${err}`);
    }
})

const fetchComments = asyncHandler(async(req, res, next) => {
    try{

        const allComments = await Comment.find({});
        if(allComments.length == 0){
            throw new ApiError(404, "No comments found.");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allComments,
                "Successfully fetched all Comments !!"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching comments : ${err}`);
    }
})  

const fetchCommentById = asyncHandler(async(req, res, next) => {
    try{

        const commentId = req.params.commentId;
        if(!isValidObjectId(commentId)){
            throw new ApiError(400, "Invalid comment id");
        }

        const comment = await Comment.findById(commentId);
        if(!comment){
            throw new ApiError(404, "Comment not found");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                comment,
                "Successfully fetched comment by id !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching comment by id : ${err}`);
    }
})  

const updateCommentById = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while updating comment by id : ${err}`);
    }
})  

const deleteCommentById = asyncHandler(async(req, res, next) => {  
    try{

    }catch(err){
        console.error(`Error occurred while deleting comment by id : ${err}`);
    }
})

const fetchLikesCount = asyncHandler(async(req, res, next) => {
    try{

        const allLikes = await Like.find({}).countDocuments();
        if(allLikes.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    0,
                    "No likes found"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allLikes,
                "Successfully fetched all likes count !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching likes count : ${err}`);
    }
})  

const fetchLikes = asyncHandler(async(req, res, next) => {
    try{

        const allLikes = await Like.find({});
        if(allLikes.length == 0){
            throw new ApiError(404, "No likes found.");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                allLikes,
                "Successfully fetched all Likes !!"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching likes : ${err}`);
    }
})

const fetchLikeById = asyncHandler(async(req, res, next) => {
    try{

        const likeId = req.params.likeId;
        if(!isValidObjectId(likeId)){
            throw new ApiError(400, "Invalid like id");
        }

        const like = await Like.findById(likeId);
        if(!like){
            throw new ApiError(404, "Like not found");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                like,
                "Successfully fetched like by id !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching like by id : ${err}`);
    }
})

const updateLikeById = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while updating like by id : ${err}`);
    }
})  

const deleteLikeById = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while deleting like by id : ${err}`);
    }
})


export {
    fetchAllUsers,
    fetchUsersCount,
    fetchUserById,
    updateUserById,
    deleteUserById,
    fetchMemoriesCount,
    fetchMemories,
    fetchMemoryById,
    updateMemoryById,
    deleteMemoryById,
    fetchCommentsCount,
    fetchComments,
    fetchCommentById,
    updateCommentById,
    deleteCommentById,
    fetchLikesCount,
    fetchLikes,
    fetchLikeById,
    updateLikeById,
    deleteLikeById
}



