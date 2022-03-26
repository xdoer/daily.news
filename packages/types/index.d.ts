import Puppeteer from 'puppeteer'

export = DN
export as namespace DN

declare namespace DN {
  namespace CrawlExt {
    interface Main {
      (puppeteer: Puppeteer.Browser): CrawlResponse
    }

    interface CrawlResponse {
      name: string
      site: string
      strategies: CrawlResponseStrategy[]
    }

    interface CrawlResponseStrategy {
      tags: string[]
      url: string
      fn: (page: Puppeteer.Page) => Promise<CrawlMeta[]>
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
      strategies: CrawlResponseStrategy[]
    }
  }

  interface CrawlMeta {
    title: string
    cover: string
    desc: string
    url: string
  }
}
