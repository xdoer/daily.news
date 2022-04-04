import { Controller, Get, Query } from '@nestjs/common'
import { QueryWebsiteDTO } from '../dtos'
import { WebsiteService } from '../service'

@Controller()
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get('website')
  website(@Query() query: QueryWebsiteDTO) {
    return this.websiteService.find({ name: query.name } as any)
  }

  @Get('websites')
  websites() {
    return this.websiteService.find()
  }
}
