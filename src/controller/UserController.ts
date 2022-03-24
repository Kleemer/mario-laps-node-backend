import {
  Get,
  JsonController,
  Param,
} from 'routing-controllers'
import { UserService } from '../service/UserService'
import { toJson } from '../common'

@JsonController()
export class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  @Get('/users')
  async getAll() {
    return { data: await toJson(this.userService.getUsers()) }
  }

  @Get('/users/:id')
  async getOne(@Param('id') id: string) {
    return { data: await toJson(this.userService.getUser(id)) }
  }
}
