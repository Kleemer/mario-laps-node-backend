import { Session } from "../entity/Session"
import { getRepository } from "typeorm"
import { RoundService } from "./RoundService"

export class SessionService {
  constructor(
    private sessionRepository = getRepository(Session),
    private roundService: RoundService = new RoundService(),
  ) {}

  async getSessions(): Promise<Session[]> {
    return this.sessionRepository.find()
  }

  async createSession(): Promise<Session> {
    console.log('createSession')
    const result = await this.sessionRepository.save(Session.create())
    await result.reload()

    // Create first round
    await this.roundService.createRound(result.id)

    return result;
  }
}
