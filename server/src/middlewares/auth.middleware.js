import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiError(403, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(403, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(`Error in user authentication: ${err}`);
        throw new ApiError(403, err?.message || "Invalid Access Token");
    }
});

