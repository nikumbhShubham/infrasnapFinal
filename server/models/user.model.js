import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["supervisor", "admin", "client"], // Define possible roles
        default: "supervisor", // Default role
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
