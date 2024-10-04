import { Router } from "express";
import { provideRecommendations } from "../controllers/recommendations.controller.js";


const router = Router();


router.route("/get-recomm")
.get(provideRecommendations);



export default router;
