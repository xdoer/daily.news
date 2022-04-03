import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Website } from '../website/website.entity'
import { Repository } from 'typeorm'
import { Post } from '../post/post.entity'
import crawl from '@daily.news/crawl'
import { Tag } from '../post/tag.entity'
import DN from '@daily.news/types'
import { Author } from '../post/author.entity'

@Injectable()
export class CrawlService {
  constructor(
    @InjectRepository(Website) private websiteRepository: Repository<Website>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {
    this.update()
  }

  async update() {
    for await (const module of crawl.modules) {
      const { name, site, logo, update } = module()
      let website = await this.websiteRepository.findOne({ name })

      if (!website) {
        website = await this.websiteRepository.create({
          name,
          site,
          logo,
          update,
        })
        website = await this.websiteRepository.save(website)
      }

      // await this.fetch(module(), website)
    }
  }

  async fetch(module: DN.CrawlExt.CrawlResponse, website: Website) {
    const { update, strategies } = module

    // 需要更新数据
    if (Date.now() - website.updatedAt > update) {
      await crawl.init()

      for await (const strategy of strategies) {
        const { data } = await crawl.fetchMeta(strategy)

        for await (const article of data) {
          const {
            tags: _tags,
            author: _author,
            cover,
            desc,
            date,
            title,
            url,
          } = article

          // 存储标签
          const tags = _tags.map((tag) => {
            const __tag = new Tag()
            __tag.name = tag
            return __tag
          })

          await this.tagRepository.save(tags)

          // 存储作者
          const author = new Author()
          author.name = _author
          await this.authorRepository.save(author)

          // 存储文章
          const post = new Post()
          post.wid = website.id
          post.cover = cover || ''
          post.title = title || ''
          post.desc = desc || ''
          post.url = url
          post.date = date
          post.tags = tags
          post.author = author

          this.postRepository.save(post)
        }
      }

      await crawl.close()
    }
  }
}
