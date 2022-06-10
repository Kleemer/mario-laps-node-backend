import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson, toJson } from '../common'
import { sortByCreated } from '../common/array'
import { Race } from './Race'

@Entity({ name: 'sessions' })
export class Session extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToMany(() => Race, race => race.session, { eager: true })
    races: Race[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

  @Column({ type: 'json', nullable: true })
    data?: { order?: string[] } | null

  toJson(): any {
    return {
      id: this.id,
      races: toJson(this.races.sort(sortByCreated)),
      data: JSON.stringify(this.data),
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
