import { Router } from "express";
import { clearBucketList, getAllBucketListItems, toggleBucketListItem } from "../controllers/bucketList.controller";


const router = Router();


router.route("/toggle/:memoryId")
.get(toggleBucketListItem);

router.route("/clear")
.get(clearBucketList);

router.route("/getall")
.get(getAllBucketListItems);


export default router;

