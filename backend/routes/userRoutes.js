import express from 'express'
import authMiddleware from '../utils/auth.js'
import userController from '../controllers/userController.js'

const router = express.Router();
 
// POST /api/users/register - Create a new user
router.post('/register', userController.createUser);
 
// POST /api/users/login - Authenticate a user and return a token
router.post('/login', userController.loginUser);

// GET /api/users/ - verify logged in user's token and then send back user details
router.use(authMiddleware)

router.get('/', userController.verifyUser);
 
export default router