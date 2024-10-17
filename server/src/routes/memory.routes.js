import { Router } from "express";
import {verifyJWT } from "../middlewares/auth.middleware.js";
import { createMemory, deleteMemory, fetchAllMemories, fetchPersonalMemories, updateMemory, updateMemoryThumbnail, viewMemory } from "../controllers/memory.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/all").get(fetchAllMemories);
router.route("/my").get(verifyJWT, fetchPersonalMemories);
router.route("/view/:memoryId").get(viewMemory);
router.route("/create").post(verifyJWT, upload.single('thumbnail'), createMemory);
router.route("/update/:memoryId").patch(verifyJWT,updateMemory);
router.route("/update-thumbnail/:memoryId").patch(verifyJWT, upload.single('thumbnail'), updateMemoryThumbnail);
router.route("/delete/:memoryId").delete(verifyJWT, deleteMemory);



export default router;