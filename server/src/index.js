import { app } from "./app.js";

import connectDB from "./db/connectDB.js";

import dotenv from "dotenv";
import { scheduleUnlockJob } from "./utils/timeCapsuleScheduler.js";
dotenv.config({ path : './.env' });
const PORT = process.env.PORT || 5000;


connectDB()
.then(() => {

    scheduleUnlockJob();

    app.listen(PORT, () => {
        console.log(`Server is running at PORT : ${PORT}`);
    })
})
.catch((err) => {
    console.log(`Mongo DB connection failed !! : ${err}`);
})

