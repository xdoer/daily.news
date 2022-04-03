import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  ManyToOne,
} from 'typeorm'
import { Author } from './author.entity'
import { Tag } from './tag.entity'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  wid: string

  @Column()
  title: string

  @Column({ default: '' })
  cover: string

  @Column()
  url: string

  @Column({ default: '' })
  date: string

  @Column({ default: '' })
  desc: string

  @ManyToOne(() => Author)
  author: Author

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

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
