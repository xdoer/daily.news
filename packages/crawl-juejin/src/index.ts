import { Crawl } from '@daily.news/types'

export default <Crawl>(() => {
  return {
    name: 'juejin',
    site: 'https://juejin.cn/',
    strategies: [
      {
        scene: 'frontend',
        url: 'https://juejin.cn/frontend',
        async fn(page) {
          return page.$$eval('.entry', (eles) =>
            eles.map((ele) => {
              const titleEle = ele.querySelector('.title')
              const url = titleEle?.getAttribute('href')
              const title = titleEle?.textContent

              const cover = ele
                .querySelector('.lazy.thumb')
                ?.getAttribute('data-src')
              const desc = ele.querySelector('.abstract')?.textContent

              return { url, title, cover, desc }
            })
          )
        }
      }
    ]
  }
})
