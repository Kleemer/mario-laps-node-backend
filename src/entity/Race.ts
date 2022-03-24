import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { RaceType } from './RaceType'
import { Round } from './Round'
import { UserPosition } from './UserPosition'

@Entity({ name: 'races' })
export class Race extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(_ => Round)
    round: Round

  @OneToOne(_ => RaceType, { nullable: true })
    raceType?: RaceType

  @OneToMany(() => UserPosition, userPosition => userPosition.race, { eager: true })
    userPositions: UserPosition[]

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
      userPositions: toJson(this.userPositions),
      raceType: toJson(this.raceType),
      raceTypeId: this.raceTypeId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
