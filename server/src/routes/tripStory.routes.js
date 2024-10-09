import { Router } from "express";
import { createTripStory } from "../controllers/tripStory.controller.js";

const router = Router();

router.route("/create-story/:journalId")
.post(createTripStory);

export default router;