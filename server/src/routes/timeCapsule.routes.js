import { Router } from "express";
import { createTimeCapsule, fetchAllTimeCapsulesofUser } from "../controllers/timeCapsule.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();



router.route("/create")
.post( upload.single('memoryImg') ,createTimeCapsule);


router.route("/get/my")
.get(fetchAllTimeCapsulesofUser);



export default router;