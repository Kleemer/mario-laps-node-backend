import { getRepository } from "typeorm"
import { Round } from "../entity/Round"
import { RaceService } from "./RaceService"

export class RoundService {
  constructor(
    private roundRepository = getRepository(Round),
    private raceService: RaceService = new RaceService(),
  ) {}

  async getRounds(sessionId: string): Promise<Round[]> {
    return this.roundRepository.find({ where: { sessionId }})
  }

  async createRound(sessionId: string): Promise<Round> {
    console.log('createRound')
    const result = await this.roundRepository.save(Round.create({ sessionId }))
    await result.reload()

    // Create first race
    await this.raceService.createRace(result.id)

    return result
  }
}
