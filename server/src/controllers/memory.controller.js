import { isValidObjectId } from "mongoose";
import { Memory } from "../modals/memory.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const fetchAllMemories = asyncHandler(async(req, res, next) => {
    try{
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;

        const skip = ( page - 1 ) * limit;

        const totalMemories = await Memory.countDocuments();
        
        if(totalMemories === 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        allMemories : [],
                        totalMemories,
                        totalPages : 0,
                        currentPage : page
                    }
                )
            )
        }

        const allMemories = await Memory.find({})
            .skip(skip)
            .limit(limit)
            .populate("author", "username avatar")

        const totalPages = Math.ceil(totalMemories / limit);
            if (page > totalPages) {
                return res.status(200).json(
                    new ApiResponse(
                        200,
                        {
                            allMemories: [],
                            totalMemories,
                            totalPages,
                            currentPage: page,
                        },
                        "Page exceeds total number of pages"
                    )
                );
            }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    allMemories,
                    totalMemories,
                    totalPages,
                    currentPage : page
                },
                "All Memories fetched Successfully"
            )
        );

    }catch(err){
        console.error(`Error occurred while fetching all memories : ${err}`);
        throw new ApiError(500, `Error occurred while fetching all memories : ${err}`);
    }
});

const fetchPersonalMemories = asyncHandler(async(req, res, next) => {
    try{    
        const userId = req.user._id;

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 3;

        const skip = ( page - 1 ) * limit;

        const totalMemories = await Memory.countDocuments({ author : userId });

        if(totalMemories === 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        allMemories : [],
                        totalMemories,
                        totalPages : 0,
                        currentPage : page
                    },
                    "No Memories Created Yet !!"
                )
            )
        }
        const totalPages = Math.ceil(totalMemories / limit);
        if (page > totalPages) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        personalMemories: [],
                        totalMemories,
                        totalPages,
                        currentPage: page,
                    },
                    "Page exceeds total number of pages"
                )
            );
        }

        const personalMemories = await Memory.find({ author : userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt : -1 });

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    personalMemories,
                    totalMemories,
                    totalPages,
                    currentPage : page
                },
                "Personal Memories Fetched Successfully"
            )
        )


    }catch(err){
        console.error(`Error occurred while fetching personal Memories : ${err}`);
        throw new ApiError(400, `Some error occurred while fetching Personal Memories`);
    }
})

const viewMemory = asyncHandler(async(req, res, next) => {
    try{    
        const { memoryId } = req.params;

        if(!isValidObjectId(memoryId)){
            throw new ApiError(400, "Invalid Memory Id !!");
        }

        const memory = await Memory.findById(memoryId);
        if(!memory){
            throw new ApiError(404, "Memory doesn't exists");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                memory,
                "Memory Content fetched Successfully !!"
            )
        )

    }catch(err){
        console.error(`Error occurred while fetching a memory : ${err}`);
        throw new ApiError(400, err?.message || "Some Error occurred while fetching Memory Content");
    }
})


const createMemory = asyncHandler(async(req, res, next) => {
    try{
        const { title, content, tripDate, location, tags, category, } = req.body;
        const userId = req.user._id;
        if(!title || !content || !location || !tags || !category){
            throw new ApiError(400, "All Fields are mandatory");
        }

        if(!Array.isArray(tags)){
            throw new ApiError(400, "Please provide tags");
        }

        if(req.file){
            const thumbnailPath = req.file?.path;
            const thumbnail = await uploadOnCloudinary(thumbnailPath);
            if(!thumbnail){
                throw new ApiError(400, "Error occurred while processing thumbnail file");
            }

            const memory = await Memory.create({
                title,
                content,
                author : userId,
                tripDate  : tripDate ?? Date.now(),
                location,
                tags,
                category,
                thumbnail : {
                    public_id : thumbnail.public_id,
                    secure_url : thumbnail.secure_url
                }
            })

            if(!memory){
                throw new ApiError(400, "Error occurred while creating new memory");
            }

            return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    memory,
                    "New Memory Created Successfully"
                )
            )
        }
        

    }catch(err){
        console.error(`Error occurred while creating a new memory : ${err}`);
        throw new ApiError(400, "Error occurred while creating a new memory");
    }
});

const updateMemory = asyncHandler(async(req, res, next) => {
    try{
        const { title, content, location, tags, category } = req.body;
        const { memoryId } = req.params;

        if(!title && !content && !location && !tags && !category){
            throw new ApiError(400, "Atleast one field is required for updation");
        }
        let updationFields = {};
        if(title) updationFields.title = title;
        if(content) updationFields.content = content;
        if(location) updationFields.location = location;
        if(tags) updationFields.tags = tags;
        if(category) updationFields.category = category;

        const updatedMemory = await Memory.findByIdAndUpdate(
            memoryId,
            {$set : updationFields},
            {new : true}
        );

        if(!updatedMemory){
            throw new ApiError(400, "Error updating Memory details");
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                updatedMemory,
                "Memory Details Updated Successfully"
            )
        )

    }catch(err){
        console.error(`Error occurred while updating the memory details : ${err}`);
        throw new ApiError(400, "Some Error occurred while updating memory details");
    }
})

const updateMemoryThumbnail = asyncHandler(async(req, res, next) => {

})

const deleteMemory = asyncHandler(async(req, res, next) => {

})

export {
    fetchAllMemories,
    fetchPersonalMemories,
    viewMemory,
    createMemory,
    updateMemory,
    updateMemoryThumbnail,
    deleteMemory
}

