import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


router.route("/register").post( upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(getProfile);


export default router;