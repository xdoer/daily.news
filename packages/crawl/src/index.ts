import { getBrowser } from '@daily.news/crawl-utils'
import { Crawl, CrawlResponseStrategy } from '@daily.news/types'
import juejin from '@daily.news/crawl-juejin'

const modules = [
  juejin
]

export default async function main() {
  const browser = await getBrowser()

  async function getPage(strategy: CrawlResponseStrategy) {
    const { fn, url, tags } = strategy
    const page = await browser.newPage()
    await page.goto(url)
    const data = await fn(page as any)
    await page.close()
    return { tags, url, data }
  }

  async function crawl(fn: Crawl) {
    const { strategies, ...rest } = await fn(browser as any)
    return { ...rest, strategies: await Promise.all(strategies.map(getPage)) }
  }

  const res = await Promise.all(modules.map(crawl))
  await browser.close()
  return res
}
