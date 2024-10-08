import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  { ApiResponse } from "../utils/ApiResponse.js";
import { isValidObjectId } from "mongoose";
import { Friendship } from "../models/friendship.model.js";

const sendFriendRequest = asyncHandler(async(req, res, next) => {
    try{
        const { recipientId } = req.params;
        const userId = req.user._id;
        if(!isValidObjectId(recipientId)){
            throw new ApiError(400, "Invalid Recipient Id ");
        }

        if(userId.equals(recipientId)){
            throw new ApiError(400, "You cannot send a friend request to yourself");
        }

        const existingRequest = await Friendship.findOne({
            requester : userId,
            recipient : recipientId,
            status : 'pending'
        })

        if(existingRequest){
            throw new ApiError(400, "Friend Request already sent !!");
        }

        const newFriendRequest = await Friendship.create({
            requester : userId,
            recipient : recipientId,
            status : 'pending'
        });

        return res.status(201)
        .json(
            new ApiResponse(
                201,
                newFriendRequest,
                "Friend Request Sent successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while sending a Friend Request : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while sending a friend request !!"); 
    }
})

const cancelFriendRequest = asyncHandler(async(req, res, next) => {
    try{
        const { requestId } = req.params;
        const userId = req.user._id;
        if(!isValidObjectId(requestId)){
            throw new ApiError(400, "Invalid Request Id");
        }

        const friendRequest = await Friendship.findById(requestId);

        if(!friendRequest){
            throw new ApiError(404, "Friend request not found !!");
        }

        if(friendRequest.requester.toString() !== userId.toString()){
            throw new ApiError(403, "You can only cancel friend requests you have sent !! ");
        }

        await friendRequest.deleteOne();

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                friendRequest,
                "Friend request cancelled"
            )
        );


    }catch(err){
        console.error(`Error occurred while cancelling the friend request : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while cancelling the friend request !!");
    }
})

const acceptFriendRequest = asyncHandler(async(req, res, next) => {

})


const declineFriendRequest = asyncHandler(async(req, res, next) => {

})

const listAllFriends = asyncHandler(async(req, res, next) => {

})

export {
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    listAllFriends,
}

