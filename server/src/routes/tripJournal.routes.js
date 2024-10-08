import { Router } from "express";
import { addEntryToJournal, createTripJournal, fetchTripJournal } from "../controllers/tripJournal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();



router.route("/create")
.post(createTripJournal);


router.route("/get/:journalId")
.get(fetchTripJournal);

router.route("/add-entry/:journalId")
.post(upload.array("journalImg", 5), addEntryToJournal);



export default router;