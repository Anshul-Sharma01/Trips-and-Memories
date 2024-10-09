import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


const createTripStory = asyncHandler(async(req, res, next) => {
    try{

    }catch(err){
        console.error(`Error occurred while creating an ai trip-story : ${err}`);
        throw new ApiError(400, err?.message || "Error occurrd while generating a trip story !!");
    }
})


export { 
    createTripStory
}
