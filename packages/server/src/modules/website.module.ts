import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WebsiteController } from '../controllers'
import { Website, Post } from '../entities'
import { WebsiteService } from '../service'

@Module({
  imports: [TypeOrmModule.forFeature([Website, Post])],
  controllers: [WebsiteController],
  providers: [WebsiteService],
})
export class WebsiteModule {}
