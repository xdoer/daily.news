import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from '../post/tag.entity'
import { Post } from '../post/post.entity'
import { Website } from '../website/website.entity'
import { CrawlService } from './crawl.service'
import { Author } from '../post/author.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Website, Post, Tag, Author])],
  providers: [CrawlService],
})
export class CrawlModule {}
