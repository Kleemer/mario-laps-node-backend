import {
  Body,
  HttpCode,
  JsonController,
  Param,
  Patch,
  Post,
} from 'routing-controllers'
import { logger, toJson } from '../common'
import { RaceService } from '../service/RaceService'

interface RaceInput {
  roundId: string
}

interface RaceLapInput {
  withLap: boolean
}

interface RaceTypeInput {
  type: string | null
}

@JsonController()
export class RaceController {
  constructor(
    private raceService: RaceService = new RaceService()
  ) {}

  @Post('/races')
  @HttpCode(201)
  async create(@Body() data: RaceInput) {
    logger.debug('post /races')
    const race = await this.raceService.createRace(data.roundId)

    return {
      data: await toJson(race),
    }
  }

  @Patch('/races/:id/laps')
  async updateLaps(@Param('id') id: string, @Body() data: RaceLapInput) {
    logger.debug('patch /races/id/laps', id, data.withLap)

    const race = await this.raceService.updateLap(id, data.withLap)

    return {
      data: await toJson(race),
    }
  }

  @Patch('/races/:id/types')
  async updateType(@Param('id') id: string, @Body() data: RaceTypeInput) {
    logger.debug('patch /races/id/type', id, data.type)

    const race = await this.raceService.updateType(id, data.type)

    return {
      data: await toJson(race),
    }
  }
}
