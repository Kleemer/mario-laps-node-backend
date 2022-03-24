import { getRepository } from 'typeorm'
import { Race } from '../entity/Race'

export class RaceService {
  constructor(private raceRepository = getRepository(Race)) {}

  async getRaces(sessionId: string): Promise<Race[]> {
    return this.raceRepository.find({ where: { sessionId } })
  }

  async getRace(id: string): Promise<Race> {
    return this.raceRepository.findOneOrFail(id)
  }

  async createRace(roundId: string): Promise<Race | undefined> {
    const result = await this.raceRepository.save(Race.create({ roundId }))

    await result.reload()
    return result
  }

  async updateLap(id: string, withLap: boolean): Promise<Race> {
    const race = await this.getRace(id)

    race.withLap = withLap
    return await this.raceRepository.save(race)
  }

  async updateType(id: string, type: string | null): Promise<Race> {
    const race = await this.getRace(id)

    race.raceTypeId = type
    return this.raceRepository.save(race)
  }
}
