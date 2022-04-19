import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(_ => RaceType, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
    raceType: RaceType | null

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
      userPositions: toJson(this.userPositions.sort((u1, u2) => u1.position - u2.position)),
      raceType: this.raceTypeId ? toJson(this.raceType) : null,
      raceTypeId: this.raceTypeId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
