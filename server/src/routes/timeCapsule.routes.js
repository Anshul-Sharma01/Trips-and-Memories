import { Router } from "express";
import { createTimeCapsule, fetchAllTimeCapsulesofUser } from "../controllers/timeCapsule.controller.js";


const router = Router();



router.route("/create")
.post(createTimeCapsule);


router.route("/get/:userId")
.get(fetchAllTimeCapsulesofUser);



export default router;