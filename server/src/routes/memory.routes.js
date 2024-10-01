import { Router } from "express";
import {verifyJWT } from "../middlewares/auth.middleware.js";
import { createMemory, deleteMemory, fetchAllMemories, fetchPersonalMemories, updateMemory, updateMemoryThumbnail, viewMemory } from "../controllers/route.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/all").get(fetchAllMemories);
router.route("/my").get(fetchPersonalMemories);
router.route("/view/:blogId").get(viewMemory);
router.route("/create").post(verifyJWT, upload.single('thumbnail'), createMemory);
router.route("/update/:memoryId").patch(updateMemory);
router.route("/update-thumbnail/:memoryId").patch(upload.single('thumbnail'), updateMemoryThumbnail);
router.route("/delete/:blogId").delete(verifyJWT, deleteMemory);



export default router;