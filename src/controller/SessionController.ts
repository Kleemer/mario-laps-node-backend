import {
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  Param,
  Post,
} from 'routing-controllers'
import { logger, toJson } from '../common'
import { SessionService } from '../service/SessionService'

interface SessionInput {
  players: string[]
}

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
  async create(@Body() data: SessionInput) {
    logger.debug('post /sessions', data)

    const session = await this.sessionService.createSession(data.players)

    return { data: await toJson(session) }
  }

  @Delete('/sessions/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    logger.debug('delete /sessions/id', id)
    await this.sessionService.deleteSession(id)

    return { data: { ok: true } }
  }
}
