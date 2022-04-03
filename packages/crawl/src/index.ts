import { CrawlExt } from '@daily.news/types'
import juejin from '@daily.news/crawl-juejin'
import { getBrowser } from '@daily.news/crawl-utils'

class Crawl {
  browser!: CrawlExt.Browser
  modules: CrawlExt.Main[] = [juejin]

  async init() {
    this.browser = this.browser || ((await getBrowser()) as any)
  }

  async fetchMeta(strategy: CrawlExt.CrawlResponseStrategy) {
    const { fn, url, tags } = strategy
    const page = await this.browser.newPage()
    await page.goto(url)
    const data = await fn(page)
    await page.close()
    return { tags, url, data }
  }

  close() {
    this.browser.close()
  }
}

export default new Crawl()
