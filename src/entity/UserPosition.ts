import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson } from '../common'
import { Race } from './Race'
import { User } from './User'

@Entity({ name: 'userPositions' })
export class UserPosition extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('int')
    position: number

  @ManyToOne(_ => User, user => user.id, { onDelete: 'CASCADE' })
    user: User

  @ManyToOne(_ => Race, race => race.id, { onDelete: 'CASCADE' })
    race: Race

  @Column('uuid')
    userId: string

  @Column('uuid')
    raceId: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

  toJson(): any {
    return {
      id: this.id,
      position: this.position,
      userId: this.userId,
      raceId: this.raceId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
