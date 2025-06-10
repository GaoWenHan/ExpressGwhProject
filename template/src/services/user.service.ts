import AppDataSource from '../config/database'
import { User } from '../models/user'
import { eCreateUserDto } from '../dto/create-user.dto'

export class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async createUser(userData: eCreateUserDto) {
    const user = this.userRepository.create(userData)
    return await this.userRepository.save(user)
  }

  async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOneBy({ username })
  }

  async updateUser(id: number, updateData: Partial<User>) {
    await this.userRepository.update(id, updateData)
    return this.findUserById(id)
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id)
    return result.affected ? result.affected > 0 : false
  }
}
