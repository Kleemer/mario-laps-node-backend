import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { AsJson } from "../common"

@Entity({ name: "users" })
export class User extends BaseEntity implements AsJson {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  avatar?: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
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
