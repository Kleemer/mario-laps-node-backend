import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
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

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date


  toJson(): any {
    return {
      id: this.id,
      races: toJson(this.races),
      sessionId: this.sessionId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
