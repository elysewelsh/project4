import express from 'express'
import taskController from '../controllers/taskController.js'
import { authMiddleware } from '../utils/auth.js'

const router = express.Router()

router.use(authMiddleware);

// POST /api/:projectID/tasks - create new task
router.post('/:projectId/tasks', taskController.createTask);

// GET /api/projects/:projectId/tasks - retrieve tasks for given project
router.get('/projects/:projectId/tasks', taskController.getTasksByProject);

// PUT /api/tasks/:taskid - update task
router.put('/tasks/:taskId', taskController.updateTask);

// DELETE api/tasks/:taskId - delete task
router.delete('/tasks/:taskId', taskController.deleteTask);

export default router