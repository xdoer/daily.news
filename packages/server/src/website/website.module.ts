import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './website.entity';
import { WebsiteService } from './website.service';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  providers: [WebsiteService],
})
export class WebsiteModule { }
