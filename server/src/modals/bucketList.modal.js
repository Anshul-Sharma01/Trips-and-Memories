import mongoose, { Schema } from "mongoose";


const bucketListSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    memory : {
        type : Schema.Types.ObjectId,
        ref : "Memory"
    },
    memoryAuthor : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true
})



export const BucketList = mongoose.model("BucketList", bucketListSchema);





