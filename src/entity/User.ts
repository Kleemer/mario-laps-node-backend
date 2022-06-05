import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AsJson } from '../common'

@Entity({ name: 'users' })
export class User extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column()
    username: string

  @Column()
    password: string

  @Column({ nullable: true })
    avatar?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt: Date

  toJson(): any {
    return {
      id: this.id,
      name: this.username,
      avatar: this.avatar,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
