import Puppeteer from 'puppeteer'

export = DN
export as namespace DN

declare namespace DN {



  type CrawlResponseStrategyFn = (page: Puppeteer.Page) => Promise<CrawlMeta[]>

  interface CrawlMeta {
    title: string
    cover: string
    desc: string
    url: string
  }

  interface CrawlResponseStrategy {
    tags: string[]
    url: string
    fn: CrawlResponseStrategyFn
  }

  interface CrawlResponse {
    name: string
    site: string
    strategies: CrawlResponseStrategy[]
  }

  interface Crawl {
    (puppeteer: Puppeteer.Browser): CrawlResponse
  }
}
