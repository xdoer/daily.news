import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author } from './author.entity'
import { PostController } from './post.controller'
import { Post } from './post.entity'
import { PostService } from './post.service'
import { Tag } from './tag.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, Author])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
