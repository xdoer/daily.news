import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CrawlService } from '../service'
import { Author, Website, Post, Tag } from '../entities'

@Module({
  imports: [TypeOrmModule.forFeature([Website, Post, Tag, Author])],
  providers: [CrawlService],
})
export class CrawlModule {}
