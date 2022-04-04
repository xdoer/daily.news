import Puppeteer from 'puppeteer'

export = DN
export as namespace DN

declare namespace DN {
  namespace CrawlExt {

    type Browser = Puppeteer.Browser
    type Page = Puppeteer.Page

    interface Main {
      (browser?: Browser): CrawlResponse
    }

    interface CrawlResponse {
      logo: string
      name: string
      site: string
      updateInterval: number
      strategies: CrawlResponseStrategy[]
    }

    interface CrawlResponseStrategy {
      tags: string[]
      url: string
      fn: (page: Page) => Promise<CrawlMeta[]>
    }
  }

  namespace Crawl {
    interface Main {
      (): CrawlResponse
    }

    interface CrawlResponseStrategy {
      tags: string[]
      url: string
      data: CrawlMeta[]
    }

    interface CrawlResponse {
      name: string
      site: string
      logo: string
      updateInterval: string
      strategies: CrawlResponseStrategy[]
    }
  }

  interface CrawlMeta {
    title: string
    cover: string
    desc: string
    url: string
    tags?: string[]
    date?: string
    author?: string
  }

  namespace Api {

    interface Author {
      id: number
      name: string
    }

    interface Tags {
      id: number
      name: string
    }

    interface Website {
      id: number
      name: string
      logo: string
      site: string
      updateInterval: number
      updatedAt: string
      createdAt: string
    }

    interface Data {
      id: number
      title: string
      cover: string
      url: string
      date: string
      desc: string
      updatedAt: string
      createdAt: string
      author: Author
      tags: Tags[]
      website: Website
    }


    interface Posts {
      id: number
      title: string
      cover: string
      url: string
      date: string
      desc: string
      updatedAt: string
      createdAt: string
      author: Author
      tags: Tags[]
      website: Website
    }

    interface QueryPosts {
      totalItems: number
      haveNext: boolean
      data: Posts[]
    }
  }
}

