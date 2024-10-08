import { Router } from "express";

import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest, listAllFriends, sendFriendRequest } from "../controllers/friendship.controller.js";

const router = Router();

router.route("/request/:recipientId")
.post(sendFriendRequest);

router.route("/request/cancel/:requestId")
.delete(cancelFriendRequest);

router.route("/accept/:requestId")
.post(acceptFriendRequest);

router.route("/decline/:requestId")
.post(declineFriendRequest);

router.route("/list")
.get(listAllFriends);


export default router;
