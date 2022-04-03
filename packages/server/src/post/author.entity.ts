import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string
}
