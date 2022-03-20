import { getBrowser } from '@daily.news/crawl-utils'
import juejin from '@daily.news/crawl-juejin'

const crawls = [juejin]

export default async () => {
  const brower = await getBrowser()

  return crawls
}
