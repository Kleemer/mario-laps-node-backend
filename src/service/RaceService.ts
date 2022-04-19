import { getRepository } from 'typeorm'
import { Race } from '../entity/Race'
import { RaceType } from '../entity/RaceType'
import { UserPosition } from '../entity/UserPosition'

export class RaceService {
  constructor(
    private raceRepository = getRepository(Race),
    private raceTypeRepository = getRepository(RaceType),
    private userPositionRepository = getRepository(UserPosition),
  ) {}

  async getRace(id: string): Promise<Race> {
    return this.raceRepository.findOneOrFail({ where: { id } })
  }

  async createRace(roundId: string, withLap?: boolean): Promise<Race | undefined> {
    const previousRace = await this.raceRepository.findOne({ where: { roundId }, order: { createdAt: 'DESC' } })

    const _withLap = typeof withLap === 'boolean'
      ? withLap
      : typeof previousRace?.withLap === 'boolean'
        ? previousRace.withLap
        : false

    const result = await this.raceRepository.save(Race.create({ roundId, withLap: _withLap }))

    await result.reload()
    return result
  }

  async deleteRace(raceId: string): Promise<boolean> {
    await this.raceRepository.delete({ id: raceId })

    return true
  }

  async updateLap(id: string, withLap: boolean): Promise<Race> {
    const race = await this.getRace(id)

    race.withLap = withLap
    return await this.raceRepository.save(race)
  }

  async updateType(id: string, type: string | null): Promise<Race> {
    const race = await this.getRace(id)

    if (type) {
      race.raceType = await this.raceTypeRepository.findOne({ where: { id: type } })
    } else {
      race.raceType = null
    }

    return await this.raceRepository.save(race)
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
