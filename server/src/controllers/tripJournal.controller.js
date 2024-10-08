import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { TripJournal } from "../models/tripJournal.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createTripJournal = asyncHandler(async(req, res, next) => {
    try{
        const { title, description } = req.body;
        const userId = req.user._id;

        if(!title || !description){
            throw new ApiError(400, "Title and description are required");
        }

        const newJournal = await TripJournal.create({
            title,
            description,
            createdBy : userId
        })

        return res.status(201)
        .json(
            new ApiResponse(
                201,
                newJournal,
                "Trip Journal created Successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while creating a new journal : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while creating a new journal !!");
    }
})

const addEntryToJournal = asyncHandler(async(req, res, next) => {
    try{
        const { journalId } = req.params;
        const userId = req.user._id;
        const { content } = req.body;

        if(!isValidObjectId(journalId)){
            throw new ApiError(400, "Invalid Journal Id");
        }

        const journal = await TripJournal.findById(journalId);
        if(!journal || !journal.isDeleted){
            throw new ApiError(404, "Trip Journal not found !!");
        }

        if(!journal.contributors.includes(userId)){
            throw new ApiError(403, "You are not a contributor to this journal !!");
        }

        const images = [];

        if(req.file || req.files.length > 0){
            for(const file of req.files){
                const imgLocalPath = file.path;
                const img = await uploadOnCloudinary(imgLocalPath);
                if(!img){
                    throw new ApiError(400, "File corrupted, please try again later...");
                }
                images.push({
                    public_id : img.public_id,
                    secure_url : img.secure_url
                })
            }
        }else{
            throw new ApiError(400, "Atleast one file is required for creating an entry in the journal");
        }

        journal.entries.push({
            contributor : userId,
            content,
            images
        })

        await journal.save();
        return res.status(201)
        .json(
            new ApiResponse(
                201,
                journal,
                "Entry added to trip journal successfully"
            )
        );

    }catch(err){
        console.error(`Error occurred while adding entry to the journal : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while adding an entry to the journal !!");
    }
})

const fetchTripJournal = asyncHandler(async(req, res, next) => {
    try{
        const { journalId } = req.params;

        if(!isValidObjectId(journalId)){
            throw new ApiError(400, "Invalid Journal Id");
        }

        const journal = await TripJournal.findById(journalId)
        .populate("contributors", "name email")
        .populate("entries.contributor", "name email");


        if(!journal || journal.isDeleted){
            throw new ApiError(404, "Trip Journal not found");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                journal,
                "Trip Journal fetched successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching a trip journal : ${err}`);
        throw new ApiError(400, err?.message ||  "Error occurred while fetching a trip journal !!");
    }
})

export { 
    createTripJournal,
    addEntryToJournal,
    fetchTripJournal
}