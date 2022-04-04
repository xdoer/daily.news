import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string
}
