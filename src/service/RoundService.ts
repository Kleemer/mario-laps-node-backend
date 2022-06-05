import { getRepository } from 'typeorm'
import { Race } from '../entity/Race'
import { Round } from '../entity/Round'
import { RaceService } from './RaceService'

export class RoundService {
  constructor(
    private raceRepository = getRepository(Race),
    private roundRepository = getRepository(Round),
    private raceService: RaceService = new RaceService(),
  ) {}

  async getRounds(sessionId: string): Promise<Round[]> {
    return this.roundRepository.find({ where: { sessionId } })
  }

  async createRound(sessionId: string): Promise<Round> {
    const previousRound = await this.roundRepository.findOne({ where: { sessionId }, order: { createdAt: 'DESC' } })
    const lastRace = await this.raceRepository.findOne({ where: { roundId: previousRound?.id }, order: { createdAt: 'DESC' } })

    const result = await this.roundRepository.save(Round.create({ sessionId }))
    await result.reload()

    // Create first race
    await this.raceService.createRace(result.id, lastRace?.withLap)
    await result.reload()

    return result
  }

  async deleteRound(roundId: string): Promise<boolean> {
    const races = await this.raceService.getRaces(roundId)

    await Promise.all([
      races.map(async (race) => this.raceService.deleteRace(race.id)),
    ])

    await this.roundRepository.delete({ id: roundId })

    return true
  }
}
