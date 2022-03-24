import {
  Get,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers'
import { logger, toJson } from '../common'
import { SessionService } from '../service/SessionService'

@JsonController()
export class SessionController {
  constructor(
    private sessionService: SessionService = new SessionService(),
  ) {}

  @Get('/sessions')
  async getAll() {
    logger.debug('get /sessions')

    return { data: await toJson(this.sessionService.getSessions()) }
  }

  @Post('/sessions')
  @HttpCode(201)
  async create() {
    logger.debug('post /sessions')

    const session = await this.sessionService.createSession()

    return { data: await toJson(session) }
  }
}
