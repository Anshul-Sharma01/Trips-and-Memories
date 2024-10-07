import cron from "node-cron";
import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler";
import { TimeCapsule } from "../modals/timeCapsule.modal.js";

const unlockTimeCapsules = asyncHandler(async(req, res, next) => {
    try{
        const now = new Date();

        const capsulesToUnlock = await TimeCapsule.find({
            openDate : { $lte : now },
            isUnlocked : false
        })

        await TimeCapsule.updateMany(
            {
                _id : {$in : capsulesToUnlock.map((capsule) => capsule._id)},
            },
            {isUnlocked : true}
        );

        console.log(`${capsulesToUnlock.length} capsule have been unlocked.`);


    }catch(err){
        console.error(`Error while unlocking capsules : ${err}`);
    }
})


export const scheduleUnlockJob = () => {
    cron.schedule(`0 0 * *`,  async() => {
        console.log(`Checking for time capsules to unlock...`);
        await unlockTimeCapsules();
    })
};


