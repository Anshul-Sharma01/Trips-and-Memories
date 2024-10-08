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
    try{
        const { requestId } = req.params;
        const userId = req.user._id;

        const friendRequest = await Friendship.findById(requestId);

        if(!friendRequest || friendRequest.recipient.toString() !== userId.toString()){
            throw new ApiError(404, "Friend Request not found or you are not the recipient of the request !!");
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                friendRequest,
                "Friend Request Accepted Successfully"
            )
        );

    }catch(err){
        console.error(`Error occurred while accepting the friend Request : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while accepting the friend request !!");
    }
})


const declineFriendRequest = asyncHandler(async(req, res, next) => {
    try{
        const { requestId } = req.params;
        const userId = req.user._id;
        if(!isValidObjectId(requestId)){
            throw new ApiError(400, "Invalid Request Id");
        }

        const friendRequest = await Friendship.findById(requestId);

        if(!friendRequest || friendRequest.recipient.toString() !== userId.toString()){
            throw new ApiError(404, "Friend request not found or you are not the recipient");
        }

        friendRequest.status = "declined";
        await friendRequest.save();

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                friendRequest,
                "Friend Request Declined Successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while declining the friend request : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while decling the friend request !!");
    }
})

const listAllFriends = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.user._id;

        const acceptedFriends = await Friendship.find({
            $or : [
                { requester : userId}, { recipient : userId }
            ],
            status : 'accepted'
        }).populate('request recipient', 'name email');

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                acceptedFriends,
                "Successfully fetched friends list"
            )
        )
        
    }catch(err){
        console.error(`Error occurred while fetching the friend list : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching the friend list");
    }
})

const getPendingRequests = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.user._id;
        
        const pendingRequests = await Friendship.find({
            recipient : userId,
            status : "pending"
        }).populate('requester', 'name email');

        return res.status(200)
        .json(
            new ApiResponse(
                200, 
                pendingRequests,
                "Pending Friend Requests fetched Successfully"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching pending friend requests : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching pending friend requests !!");
    }
})

const removeFriend = asyncHandler(async(req, res, next) => {
    try{
        const { friendId } = req.params;
        const userId = req.user._id;
        if(!isValidObjectId(friendId)){
            throw new ApiError(400, "Invalid Friend Id");
        }

        const friendship = await Friendship.findOneAndDelete({
            $or : [
                { requester : userId, recipient : friendId, status : 'accepted'},
                { requester : friendId, recipient : userId, status : 'accepted'}
            ]
        });

        if(!friendship){
            throw new ApiError(400, "Friendshi not found !!");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                friendship,
                "Friend Removed Successfully"
            )
        );
    }catch(err){
        console.error(`Error occurred while removing a friend from friend list : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while removing a friend from friend list !!");
    }
})

export {
    sendFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    listAllFriends,
    getPendingRequests,
    removeFriend,

}

