import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  login: string

  @Column()
  site: string
}
