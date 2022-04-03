import { Website } from '../website/website.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { Author } from './author.entity'
import { Tag } from './tag.entity'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Website)
  website: Website

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
