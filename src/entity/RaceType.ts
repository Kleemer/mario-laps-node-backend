import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm'
import { AsJson } from '../common'

@Entity({ name: 'raceTypes' })
export class RaceType extends BaseEntity implements AsJson {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
    }
  }
}
