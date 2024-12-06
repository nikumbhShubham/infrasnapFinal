import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role: "client"  // Default role for normal users
        });

        // Save the user to the database
        await newUser.save();

        // Create a JWT token for the user (optional, can be used for authentication)
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "User registered successfully",
            token, // Send the token in response
            user: {
                id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                role: newUser.role,
            }
        });
    } catch (error) {
        next(error);
    }
};



export const signin = async (request, response, next) => {
    const { email, password } = request.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return response.status(404).json({ success: false, message: 'User not found' });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return response.status(401).json({ success: false, message: 'Wrong credentials' });
        }

        const token = jwt.sign(
            { id: validUser._id, role: validUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000);

        response
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json({ success: true, ...rest , token });
    } catch (error) {
        next(error);
    }
};


export const google = async (request, response, next) => {
    try {
        const { email, name, photo } = request.body;
        const user = await User.findOne({ email });
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            response.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email,
                password: hashPassword,
                profilePicture: photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = newUser._doc;
            response.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (request, response) => {
    response.clearCookie('access_token').status(200).json("signout success...")
}


