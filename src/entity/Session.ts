import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { sortByCreated } from '../common/array'
import { Round } from './Round'

@Entity({ name: 'sessions' })
export class Session extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToMany(() => Round, round => round.session, { eager: true })
    rounds: Round[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

  @Column({ type: 'json', nullable: true })
    data?: { order?: string[] } | null

  toJson(): any {
    return {
      id: this.id,
      rounds: toJson(this.rounds.sort(sortByCreated)),
      data: JSON.stringify(this.data),
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
