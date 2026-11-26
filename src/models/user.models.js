import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,// cloudinary url
            required: true,
        },
        coverImage: {
            type: String,// cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
},{timestamps: true });   



// Generate JWT token for the user
userSchema.methods.generateJWT = function () {
    const payload = {
        id: this._id,
        username: this.username,
        email: this.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email,
    };
    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRY });
    return token;
};
userSchema.methods.generateRefreshToken = function () {
    const payload = {
        id: this._id,
    };
    const token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY });
    return token;
}

export const User = mongoose.model("User", userSchema);