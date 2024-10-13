import cron from "node-cron";
import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler.js";
import { TimeCapsule } from "../models/timeCapsule.model.js";

const unlockTimeCapsules = asyncHandler(async (req, res, next) => {
    try {
        console.log("UnlockTimeCapsules function running...");

        const now = new Date();
        console.log("Current time:", now);

        const capsulesToUnlock = await TimeCapsule.find({
            openDate: { $lte: now },
            isUnlocked: false
        });

        console.log("Capsules to unlock:", capsulesToUnlock);

        if (capsulesToUnlock.length > 0) {
            await TimeCapsule.updateMany(
                {
                    _id: { $in: capsulesToUnlock.map((capsule) => capsule._id) },
                },
                { isUnlocked: true }
            );

            console.log(`${capsulesToUnlock.length} capsules have been unlocked.`);
        } else {
            console.log("No capsules to unlock at this time.");
        }

    } catch (err) {
        console.error(`Error while unlocking capsules: ${err}`);
    }
});

export const scheduleUnlockJob = () => {
    console.log("Initializing cron job...");
    
    cron.schedule('0 0 * * *', async () => { 
        console.log("Checking for time capsules to unlock...");
        await unlockTimeCapsules();
    });

    console.log("Cron job scheduled.");
};
