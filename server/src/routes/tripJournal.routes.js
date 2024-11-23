import { Router } from "express";
import { addEntryToJournal, closeJournal, createTripJournal, deleteJournalEntry, fetchTripJournalDetails, fetchUserTripJournals, manageContributors, updateJournalEntry } from "../controllers/tripJournal.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT)

router.route("/create")
.post(createTripJournal);

router.route("/fetch/my")
.get(fetchUserTripJournals);

router.route("/get/:journalId")
.get(fetchTripJournalDetails);

router.route("/add-entry/:journalId")
.post(upload.array("journalImg", 5), addEntryToJournal);

router.route("/delete/:journalId/:entryId")
.delete(deleteJournalEntry);

router.route("/update-entry/:journalId/:entryId")
.patch(updateJournalEntry);

router.route("/close/:journalId")
.get(closeJournal);

router.route("/manage/contributors/:journalId")
.patch(manageContributors);


export default router;