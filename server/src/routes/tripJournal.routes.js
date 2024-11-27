import { Router } from "express";
import { addEntryToJournal, closeJournal, createTripJournal, deleteJournal, fetchJournalContributors, fetchTripJournalDetails, fetchTripJournalEntries, fetchUserTripJournals, manageContributors } from "../controllers/tripJournal.controller.js";
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

router.route("/get/journal-entries/:journalId")
.get(fetchTripJournalEntries);

router.route("/add-entry/:journalId")
.post(upload.array("journalImg", 5), addEntryToJournal);

router.route("/close/:journalId")
.get(closeJournal);

router.route("/d/:journalId")
.delete(deleteJournal);

router.route("/get/c/:journalId")
.get(fetchJournalContributors);

router.route("/manage/contributors/:journalId")
.patch(manageContributors);


export default router;