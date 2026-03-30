import express from 'express'
import authMiddleware from '../utils/auth.js'
import projectController from '../controllers/projectController.js'

const router = express.Router()
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
// GET /api/projects - Get all projects for the logged-in user
router.get('/', projectController.getUserProjects);

//GET /api/projects/:id - Get project by ID
router.get('/:id', projectController.getProjectById);
 
// POST /api/projects - Create a new project
router.post('/', projectController.createProject);
 
// PUT /api/projects/:id - Update a project
router.put('/:id', projectController.updateProject);
 
// DELETE /api/projects/:id - Delete a project
router.delete('/:id', projectController.deleteProject);
 
export default router