import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
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

  toJson(): any {
    return {
      id: this.id,
      rounds: toJson(this.rounds),
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
