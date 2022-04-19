import { getRepository } from 'typeorm'
import { RaceType } from '../entity/RaceType'

export class RaceTypeService {
  constructor(private raceTypeRepository = getRepository(RaceType)) {}

  async getRaceTypes(): Promise<RaceType[]> {
    return this.raceTypeRepository.find()
  }
}
