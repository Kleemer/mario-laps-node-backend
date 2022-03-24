import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne(_ => User)
    user: User

  @ManyToOne(_ => Race)
    race: Race

  @Column('uuid')
    userId: string

  @Column('uuid')
    raceId: string

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
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
