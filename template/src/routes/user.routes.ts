import express from 'express'
import { UserController } from '../controllers/user.controller.ts'

const router = express.Router()
const userController = new UserController()

const asyncHandler = (fn: Function) => 
  (req: express.Request, res: express.Response, next: express.NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next)

router.post('/users', asyncHandler(userController.createUser.bind(userController)))
router.get('/users/:id', asyncHandler(userController.getUser.bind(userController)))
router.put('/users/:id', asyncHandler(userController.updateUser.bind(userController)))
router.delete('/users/:id', asyncHandler(userController.deleteUser.bind(userController)))

export default router
