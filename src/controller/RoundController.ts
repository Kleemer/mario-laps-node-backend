import {
  Body,
  HttpCode,
  JsonController,
  Post,
} from 'routing-controllers'
import { logger, toJson } from '../common'
import { RoundService } from '../service/RoundService'

interface RoundInput {
  sessionId: string
}

@JsonController()
export class RoundController {
  constructor(
    private roundService: RoundService = new RoundService()
  ) {}

  @Post('/rounds')
  @HttpCode(201)
  async create(@Body() data: RoundInput) {
    logger.debug('post /rounds')
    const round = await this.roundService.createRound(data.sessionId)

    return {
      data: await toJson(round),
    }
  }
}
