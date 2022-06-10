import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { RaceType } from './RaceType'
import { Session } from './Session'
import { UserPosition } from './UserPosition'

@Entity({ name: 'races' })
export class Race extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(_ => Session, session => session.id, { onDelete: 'CASCADE' })
    session: Session

  @OneToOne(_ => RaceType, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
    raceType: RaceType | null

  @OneToMany(() => UserPosition, userPosition => userPosition.race, { eager: true })
    userPositions: UserPosition[]

  @Column('bool')
    withLap: boolean

  @Column('uuid')
    sessionId: string

  @Column('uuid', { nullable: true })
    raceTypeId: string | null

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

  toJson(): any {
    return {
      id: this.id,
      withLap: this.withLap,
      sessionId: this.sessionId,
      userPositions: toJson(this.userPositions.sort((u1, u2) => u1.position - u2.position)),
      raceType: this.raceTypeId ? toJson(this.raceType) : null,
      raceTypeId: this.raceTypeId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
