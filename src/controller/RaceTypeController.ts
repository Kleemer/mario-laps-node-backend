import {
  Get,
  JsonController,
} from 'routing-controllers'
import { toJson } from '../common'
import { RaceTypeService } from '../service/RaceTypeService'

@JsonController()
export class RaceTypeController {
  constructor(
    private raceTypeService: RaceTypeService = new RaceTypeService(),
  ) {}

  @Get('/race-types')
  async getAll() {
    return { data: await toJson(this.raceTypeService.getRaceTypes()) }
  }
}
