import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { eCreateUserDto } from '../dto/create-user.dto'

export class UserController {
  private userService = new UserService()

  async createUser(req: Request, res: Response) {
    try {
      const userDto = plainToClass(eCreateUserDto, req.body)
      const errors = await validate(userDto)

      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const user = await this.userService.createUser(userDto)
      res.status(201).json(user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(500).json({ message })
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.findUserById(id)
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json(user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(500).json({ message })
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const user = await this.userService.updateUser(id, req.body)
      res.json(user)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(500).json({ message })
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const success = await this.userService.deleteUser(id)
      
      if (!success) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(204).send()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred'
      res.status(500).json({ message })
    }
  }
}
