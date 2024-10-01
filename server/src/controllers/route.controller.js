import { asyncHandler } from "../utils/asyncHandler";



const fetchAllMemories = asyncHandler(async(req, res, next) => {
    
});

const fetchPersonalMemories = asyncHandler(async(req, res, next) => {

})

const viewMemory = asyncHandler(async(req, res, next) => {

})


const createMemory = asyncHandler(async(req, res, next) => {

});

const updateMemory = asyncHandler(async(req, res, next) => {

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


