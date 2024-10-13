import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post( upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").get( verifyJWT, logout);
router.route("/me").get(getProfile);


export default router;