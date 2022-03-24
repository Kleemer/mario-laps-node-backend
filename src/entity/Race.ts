import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { RaceType } from './RaceType'
import { Round } from './Round'

@Entity({ name: 'races' })
export class Race extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Round)
  round: Round

  @OneToOne(type => RaceType, { nullable: true })
  raceType?: RaceType

  @Column('bool')
  withLap: boolean

  @Column('uuid')
  roundId: string

  @Column('uuid', { nullable: true })
  raceTypeId: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  toJson(): any {
    return {
      id: this.id,
      withLap: this.withLap,
      roundId: this.roundId,
      raceType: toJson(this.raceType),
      raceTypeId: this.raceTypeId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
