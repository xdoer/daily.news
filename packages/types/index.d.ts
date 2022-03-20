import Puppeteer from 'puppeteer'

export = DN
export as namespace DN

declare namespace DN {

  interface CrawlResponseStrategy {
    scene: string
    fn(page: Puppeteer.Page): Promise<any>
  }

  interface CrawlResponse {
    name: string
    site: string
    strategy: CrawlResponseStrategy[]
  }

  interface Crawl {
    (puppeteer: Puppeteer.Browser): CrawlResponse
  }
}
