import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
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
