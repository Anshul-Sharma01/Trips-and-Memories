import { TimeCapsule } from "../modals/timeCapsule.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";




const createTimeCapsule = asyncHandler(async(req, res, next) => {
    try{
        const {  title, description, openDate, memoryText,  memoryDescription } = req.body;

        const userId = req.user._id;

        if(!title || !description || !openDate || !memoryDescription || !memoryText){
            throw new ApiError(400, "All fields are mandatory");
        }

        if(req.file){
            const memoryImgLocalPath = req.file?.path;
            const memoryImg = await uploadOnCloudinary(memoryImgLocalPath);
            if(!memoryImg){
                throw new ApiError(400, "Memory Image corrupted, plase try again later..");
            }

            const newCapsule = await TimeCapsule.create({
                owner : userId,
                title,
                description,
                openDate,
                memoryText,
                memoryDescription,
                memoryImg : {
                    public_id : memoryImg.public_id,
                    secure_url : memoryImg.secure_url
                }
            })

            return res.status(201)
            .json(
                new ApiResponse(
                    201,
                    newCapsule,
                    `Time Capsule successfully created and will unlock on ${openDate}`
                )
            );

        }else{
            throw new ApiError(400, "Memory Image file is required !!");
        }


    }catch(err){
        console.error(`Error occurred while creating a time capsule : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while creating a time capsule !!");
    }
})

const fetchAllTimeCapsulesofUser = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.user._id;
        const capsules = await TimeCapsule.find({ owner : userId });
        if(capsules.length == 0){
            return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    capsules,
                    "No Time Capsules created yet !!"
                )
            )
        }

        return res.status(200)
        .json(
            new ApiResponse(
                200,
                capsules,
                "Successfully fetched all Time Capsules"
            )
        )
    }catch(err){        
        console.error(`Error occurred while fetching all Time Capsules of the user : ${err}`);
        throw new ApiError(400, err?.message || "Error occurred while fetching all time capsules of the user !!");
    }
})




export { 
    createTimeCapsule,
    fetchAllTimeCapsulesofUser
}


