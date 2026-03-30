import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router();
 
// POST /api/users/register - Create a new user
router.post('/register', userController.createUser);
 
// POST /api/users/login - Authenticate a user and return a token
router.post('/login', userController.loginUser);
 
export default router