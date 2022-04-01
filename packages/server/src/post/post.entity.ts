import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  uid: string

  // 网站 id
  @Column()
  wid: string

  // 文章名称
  @Column()
  name: string
}
