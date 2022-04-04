import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostController } from '../controllers'
import { PostService } from '../service'
import { Tag, Post, Author } from '../entities'

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, Author])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
