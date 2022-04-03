import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { Website } from './website.entity'
import crawl from '@daily.news/crawl'
import { Post } from '../post/post.entity'

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website) private websiteRepository: Repository<Website>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {
    this.init()
  }

  async init() {
    for await (const module of crawl.modules) {
      const { name, site, logo, update, strategies } = module()
      let website = await this.websiteRepository.findOne({ name })
      if (!website) {
        website = await this.websiteRepository.create({
          name,
          site,
          logo,
          update,
        })
        await this.websiteRepository.save(website)
      }
    }
  }

  find(opt?: FindManyOptions<Website>): Promise<Website[]> {
    return this.websiteRepository.find(opt)
  }

  findOne(id: string): Promise<Website> {
    return this.websiteRepository.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.websiteRepository.delete(id)
  }
}
