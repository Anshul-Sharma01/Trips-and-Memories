import { Router } from "express";
import { toggleCommentLike, toggleMemoryLike } from "../controllers/like.controller.js";


const router = Router();



router.route("/toggle/m/:memoryId")
.get(toggleMemoryLike);

router.route("/toggle/c/:commentId")
.get(toggleCommentLike);



export default router;
