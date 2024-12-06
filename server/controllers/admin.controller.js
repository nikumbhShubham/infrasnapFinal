import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

// Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude passwords from response
        res.status(200).json(users);
    } catch (error) {
        next(errorHandler(500, "Failed to fetch users"));
    }
};

// Assign a role to a user (Admin only)
export const registerRole = async (req, res, next) => {
    const { firstname, lastname, email, password, role } = req.body;

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can create admins or supervisors." });
    }

    if (!["admin", "supervisor"].includes(role)) {
        return res.status(400).json({ message: "Invalid role provided. Use 'admin' or 'supervisor'." });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: `${role} created successfully!`, user: newUser });
    } catch (error) {
        next(error);
    }
};
