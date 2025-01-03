
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const fetchAllUsers = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching all users : ${err}`);
    }
})

const fetchUsersCount = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching users count : ${err}`);
    }
})   

const fetchUserById = asyncHandler(async(req, res, next) => {
    try{

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

    }catch(err){
        console.error(`Error occurred while fetching memories count : ${err}`);
    }
})

const fetchMemories = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching memories : ${err}`);
    }
})

const fetchMemoryById = asyncHandler(async(req, res, next) => { 
    try{

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

    }catch(err){
        console.error(`Error occurred while fetching comments count : ${err}`);
    }
})

const fetchComments = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching comments : ${err}`);
    }
})  

const fetchCommentById = asyncHandler(async(req, res, next) => {
    try{

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

    }catch(err){
        console.error(`Error occurred while fetching likes count : ${err}`);
    }
})  

const fetchLikes = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while fetching likes : ${err}`);
    }
})

const fetchLikeById = asyncHandler(async(req, res, next) => {
    try{

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



