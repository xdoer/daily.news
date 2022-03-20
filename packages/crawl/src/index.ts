import { getBrowser } from '@daily.news/crawl-utils'
import { Crawl, CrawlResponseStrategy } from '@daily.news/types'
import juejin from '@daily.news/crawl-juejin'

const list = [juejin]

export default async function main() {
  const browser = await getBrowser()

  async function getPage(strategy: CrawlResponseStrategy) {
    const { fn, url } = strategy
    const page = await browser.newPage()
    await page.goto(url)
    const res = await fn(page as any)
    await page.close()
    return res
  }

  async function crawl(fn: Crawl) {
    const { strategies } = await fn(browser as any)
    return Promise.all(strategies.map(getPage))
  }

  const res = await Promise.all(list.map(crawl))
  await browser.close()

  return res
}

main()