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
      update: number
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
      update: string
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
}
