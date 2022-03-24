import { getRepository } from 'typeorm'
import { Race } from '../entity/Race'
import { UserPosition } from '../entity/UserPosition'

export class RaceService {
  constructor(
    private raceRepository = getRepository(Race),
    private userPositionRepository = getRepository(UserPosition),
  ) {}

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

  async addPositions(id: string, userPositions: { userId: string, position: number }[]): Promise<Race> {
    const race = await this.getRace(id)

    await Promise.all(userPositions.map(async (e) => {
      let userPosition = await this.userPositionRepository.findOne({
        where: {
          userId: e.userId,
          raceId: id,
        },
      })

      if (!userPosition) {
        userPosition = UserPosition.create({
          userId: e.userId,
          raceId: id,
        })
      }

      userPosition.position = e.position

      return this.userPositionRepository.save(userPosition)
    }))

    await race.reload()

    return race
  }
}
