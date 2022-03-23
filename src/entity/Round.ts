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
import { Session } from './Session';

@Entity({ name: 'rounds' })
export class Round extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => Session, { eager: true })
  session: Session;

  @Column('uuid')
  sessionId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date


  toJson(): any {
    return {
      id: this.id,
      sessionId: this.sessionId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    }
  }
}
