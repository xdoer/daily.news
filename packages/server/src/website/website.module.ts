import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../post/post.entity'
import { WebsiteController } from './website.controller'
import { Website } from './website.entity'
import { WebsiteService } from './website.service'

@Module({
  imports: [TypeOrmModule.forFeature([Website, Post])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
