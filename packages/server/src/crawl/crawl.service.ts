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
      const { name, site, logo, updateInterval } = module()
      let website = await this.websiteRepository.findOne({ name })

      if (!website) {
        website = await this.websiteRepository.create({
          name,
          site,
          logo,
          updateInterval,
        })
        website = await this.websiteRepository.save(website)
      }

      await this.fetch(module(), website)
    }
  }

  async fetch(module: DN.CrawlExt.CrawlResponse, website: Website) {
    const { updateInterval, strategies } = module

    const hours = updateInterval * 1000 * 60 * 60

    // 需要更新数据
    if (Date.now() - website.updatedAt > hours) {
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

          let tags = []
          for await (const _tag of _tags) {
            const __tag = await this.tagRepository.findOne({ name: _tag })
            if (!__tag) {
              const tag = new Tag()
              tag.name = _tag
              await this.tagRepository.save(tag)
              tags.push(tag)
            } else {
              tags.push(__tag)
            }
          }


          let author = await this.authorRepository.findOne({ name: _author })
          if (!author) {
            // 存储作者
            const __author = new Author()
            __author.name = _author
            await this.authorRepository.save(__author)
            author = __author
          }

          const post = await this.postRepository.findOne({ url })

          if (!post) {
            // 存储文章
            const post = new Post()
            post.website = website
            post.cover = cover || ''
            post.title = title || ''
            post.desc = desc || ''
            post.url = url
            post.date = date
            post.tags = tags
            post.author = author

            await this.postRepository.save(post)
          }
        }
      }

      await crawl.close()
    }

    await this.websiteRepository.update(website.id, { updatedAt: () => 'CURRENT_TIMESTAMP' })
  }
}
