import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";



const userSchema = new Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username already exists"],
        trim : true,
        lowercase : true,
    },
    name : {
        type : String,
        required : [true, "Name is required"],
        trim : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exists"],
        lowercase : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please fill in a valid email address"
        ]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minLength : [8, "Password must be of atleast 8 characters"],
        select : false
    },
    role : {
        type : String,
        enum : ['USER', 'ADMIN'],
        default : 'USER'
    },
    avatar : {
        public_id : {
            type : String,
            required : true,
        },
        secure_url : {
            type : String,
            required : true
        }
    },
    numberOfMemories : {
        type : Number,
        default : 0,
        minLength : [0, "Number of Memories can't be less than 0"]
    },
    refreshToken : {
        type : String
    },
    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
},{
    timestamps : true
})


userSchema.pre('save', async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})





export const User = mongoose.model("User", userSchema);
