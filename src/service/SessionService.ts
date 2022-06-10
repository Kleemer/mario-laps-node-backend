import { Session } from '../entity/Session'
import { getRepository } from 'typeorm'
import { RaceService } from './RaceService'

export class SessionService {
  constructor(
    private sessionRepository = getRepository(Session),
    private raceService: RaceService = new RaceService(),
  ) {}

  async getSessions(): Promise<Session[]> {
    return (await this.sessionRepository.find())
      .sort((s1, s2) => s2.createdAt.getTime() - s1.createdAt.getTime())
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessionRepository.findOne({ where: { id } })
  }

  async createSession(players: string[]): Promise<Session> {
    const result = await this.sessionRepository.save(Session.create())
    result.data = { order: players }
    await result.save()
    await result.reload()

    // Create first race
    await this.raceService.createRace(result.id, true)
    await result.reload()

    return result
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    const races = await this.raceService.getRaces(sessionId)

    await Promise.all([
      races.map(async (race) => this.raceService.deleteRace(race.id)),
    ])

    await this.sessionRepository.delete({ id: sessionId })

    return true
  }
}
