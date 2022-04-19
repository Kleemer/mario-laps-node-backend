import {
  Get,
  HttpCode,
  JsonController,
  Param,
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

  @Get('/sessions/:id')
  async getOne(@Param('id') id: string) {
    return { data: await toJson(this.sessionService.getSession(id)) }
  }

  @Post('/sessions')
  @HttpCode(201)
  async create() {
    logger.debug('post /sessions')

    const session = await this.sessionService.createSession()

    return { data: await toJson(session) }
  }
}
