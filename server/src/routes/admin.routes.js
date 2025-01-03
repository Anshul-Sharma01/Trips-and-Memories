import { Router } from "express";
import { fetchUsersCount, fetchMemoriesCount, fetchMemories, fetchAllUsers, fetchUserById, updateUserById, deleteUserById, deleteMemoryById, deleteCommentById, fetchComments, fetchCommentsCount, fetchLikes, fetchLikesCount, fetchLikeById, updateLikeById, deleteLikeById} from "../controllers/admin.controllers.js";

const router = Router();

router.route("/fetch-users-count").get(fetchUsersCount);
router.route("/fetch-memories-count").get(fetchMemoriesCount);
router.route("/fetch-memories").get(fetchMemories);
router.route("/fetch-users").get(fetchAllUsers);
router.route("/fetch-user/:userId").get(fetchUserById);
router.route("/update-user/:userId").put(updateUserById);
router.route("/delete-user/:userId").delete(deleteUserById);
router.route("/delete-memory/:memoryId").delete(deleteMemoryById);
router.route("/delete-comment/:commentId").delete(deleteCommentById);
router.route("/fetch-comments").get(fetchComments);
router.route("/fetch-comments-count").get(fetchCommentsCount);
router.route("/fetch-likes").get(fetchLikes);
router.route("/fetch-likes-count").get(fetchLikesCount);
router.route("/fetch-like/:likeId").get(fetchLikeById);
router.route("/update-like/:likeId").put(updateLikeById);
router.route("/delete-like/:likeId").delete(deleteLikeById);


export default router;


