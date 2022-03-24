import { User } from '../entity/User'
import { getRepository } from 'typeorm'

export class UserService {
  constructor(private userRepository = getRepository(User)) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id)
  }

  async createUser(user: User): Promise<User> {
    const result = await this.userRepository.save(user)
    await result.reload

    return result
  }
}
