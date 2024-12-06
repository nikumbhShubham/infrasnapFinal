import express from 'express';
import { 
    getAllUsers, 
    registerRole
} from '../controllers/admin.controller.js';
import { verifyToken, verifyRole } from '../utils/verifyToken.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/users', verifyToken, verifyRole(["admin"]), getAllUsers);

// Assign a role to a user (Admin only)
router.post('/register-role', verifyToken, verifyRole(["admin"]), registerRole);

export default router;
