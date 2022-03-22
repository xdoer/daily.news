import { Injectable } from '@nestjs/common';
import crawl from '@daily.news/crawl'

@Injectable()
export class AppService {
  getHello() {
    return crawl()
  }
}
