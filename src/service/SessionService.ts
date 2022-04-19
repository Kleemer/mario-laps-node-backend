import { Session } from '../entity/Session'
import { getRepository } from 'typeorm'
import { RoundService } from './RoundService'

export class SessionService {
  constructor(
    private sessionRepository = getRepository(Session),
    private roundService: RoundService = new RoundService(),
  ) {}

  async getSessions(): Promise<Session[]> {
    return this.sessionRepository.find()
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessionRepository.findOne({ where: { id } })
  }

  async createSession(): Promise<Session> {
    const result = await this.sessionRepository.save(Session.create())
    await result.reload()

    // Create first round
    await this.roundService.createRound(result.id)
    await result.reload()

    return result
  }
}
