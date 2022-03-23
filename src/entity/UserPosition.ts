import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AsJson } from '../common'

@Entity({ name: 'userPositions' })
export class UserPosition extends BaseEntity implements AsJson {
  @PrimaryColumn('uuid')
  id: string

  @Column('int')
  position: number

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
