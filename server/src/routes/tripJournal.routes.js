import { Router } from "express";
import { addEntryToJournal, createTripJournal, deleteJournalEntry, fetchTripJournal, updateJournalEntry } from "../controllers/tripJournal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();



router.route("/create")
.post(createTripJournal);


router.route("/get/:journalId")
.get(fetchTripJournal);

router.route("/add-entry/:journalId")
.post(upload.array("journalImg", 5), addEntryToJournal);

router.route("/delete/:journalId/:entryId")
.delete(deleteJournalEntry);

router.route("/update/:journalId/:entryId")
.patch(updateJournalEntry);


export default router;