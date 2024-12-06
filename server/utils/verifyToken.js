import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware to verify the token and attach user information (including role) to the request object
export const verifyToken = (request, response, next) => {
    const token = request.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Access denied: No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, "Token is not valid"));
        }

        // Attach the user object (id and role) from the token to the request
        request.user = user;
        next();
    });
};

// Middleware to verify if the user has the required role(s)
export const verifyRole = (allowedRoles) => {
    return (request, response, next) => {
        const userRole = request.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return next(errorHandler(403, "Access denied: Insufficient permissions"));
        }
        next();
    };
};

