import express from 'express';
import { 
    test, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller.js';
import { verifyToken, verifyRole } from '../utils/verifyToken.js'; // Updated path

const router = express.Router();

// Test route (public)
router.get('/', test);

// Update user route (accessible by the user themselves or an admin)
router.put('/update/:id', verifyToken, verifyRole(["supervisor", "admin","client"]), updateUser);

// Delete user route (accessible only by admin)
router.delete('/delete/:id', verifyToken, verifyRole(["supervisor", "admin","client"]), deleteUser);

export default router;
