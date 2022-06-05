import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { sortByCreated } from '../common/array'
import { Race } from './Race'
import { Session } from './Session'

@Entity({ name: 'rounds' })
export class Round extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(_ => Session)
    session: Session

  @OneToMany(() => Race, race => race.round, { eager: true })
    races: Race[]

  @Column('uuid')
    sessionId: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date


  toJson(): any {
    return {
      id: this.id,
      races: toJson(this.races.sort(sortByCreated)),
      sessionId: this.sessionId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
