import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  logo: string

  @Column()
  site: string

  @Column()
  updateInterval: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: number

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: number
}
