import { User } from "../modals/user.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";



const cookieOptions = {
    maxAge : 7 * 24 * 60 * 60 * 1000,
    secure : true,
    httpOnly : true,
    sameSite : "none"
}

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave : false });
        return { accessToken, refreshToken };
    }catch(err){
        throw new ApiError(500, "Something went wrong while generating Access and Refresh Tokens");
    }
}


const register = asyncHandler(async(req, res, next) => {
    try{
        const { username, name, email, password } = req.body;

        if(!username || !name || !email || !password){
            throw new ApiError(400, "All fields are mandatory");
        }

        const userNameExists = await User.findOne({ username });
        if(userNameExists){
            throw new ApiError(400, "Username already exists");
        }

        const emailExists = await User.findOne({ email });
        if(emailExists){
            throw new ApiError(400,"Email already exists");
        }

        if(req.file){
            const localAvatarPath = req.file?.path;
            const avatar = await uploadOnCloudinary(localAvatarPath);

            if(!avatar.secure_url){
                throw new ApiError(400, "Avatar file is not uploaded correctly");
            }

            const user = await User.create({
                username, 
                name,
                email,
                password,
                avatar : {
                    secure_url : avatar?.secure_url,
                    public_id : avatar?.public_id
                }
            });

            const newUser = await User.findById(user._id).select("-password -refreshToken");
            if(!newUser){
                throw new ApiError(500, "Something went wrong, user not created..");
            }

            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

            return res.status(201)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    201, 
                    {user : newUser, accessToken, refreshToken},
                    "User registered successfully"
                )
            );

        }
        else{
            throw new ApiError(400, "Avatar file is required");
        }

    }catch(err){
        console.log(`Error occurred while registering new user : ${err}`);
        throw new ApiError(500, `Something went wrong...`);
    }
})

const login = asyncHandler(async(req, res, next) => {
    try{    
        const { loginInput, password } = req.body;

        if(!loginInput || !password) {
            throw new ApiError(400, "All fields are necessary");
        }

        const userExists = await User.findOne({
            $or : [{username : loginInput}, {email : loginInput}],
        });

        if(!userExists){
            throw new ApiError(400, "User does not exists..");
        }

        const isPasswordValid = await userExists.isPasswordCorrect(password);

        if(!isPasswordValid){
            throw new ApiError(401, "Invalid User Credentials");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(userExists._id);

        return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user : loggedInUser,
                    accessToken, refreshToken
                },
                "User Authenticated Successfully"
            )
        )

    }catch(err){
        console.log(`Error occurred while authenticating user : ${err}`);
        throw new ApiError(400, err?.message || "Authentication failed");
    }
})

const logout = asyncHandler(async(req, res, next) => {
    try{
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset : {
                    refreshToken : undefined
                }
            },
            {
                new : true
            }
        )

        return res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                {},
                "User Logged-Out Successfully"
            )
        )

    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while logging out..");
    }
})

const getProfile = asyncHandler(async(req, res, next) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId);
        res.status(200)
        .json(
            200,
            user,
            "User Fetched successfully"
        );
    }catch(err){
        throw new ApiError(400, err?.message || "Error occurred while fetching user profile");
    }
})

export { 
    register,
    login,
    logout,
    getProfile
}