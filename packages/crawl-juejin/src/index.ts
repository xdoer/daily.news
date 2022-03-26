import { CrawlExt } from '@daily.news/types'

export default <CrawlExt.Main>(() => {
  return {
    name: 'juejin',
    site: 'https://juejin.cn/',
    strategies: [
      {
        tags: ['frontend'],
        url: 'https://juejin.cn/frontend',
        async fn(page) {
          return page.$$eval('.entry', (els) =>
            els.map((ele) => {
              function htmlFormat(text = '') {
                return text.replace(/(\s|\t|\n)+/g, '')
              }

              // title
              const titleEle = ele.querySelector('.title')
              const url = titleEle?.getAttribute('href')
              const title = htmlFormat(titleEle?.textContent || '')

              // cover
              const coverEle = ele.querySelector('.lazy.thumb')
              const cover = coverEle?.getAttribute('data-src')

              // desc
              const descEle = ele.querySelector('.abstract')
              const desc = htmlFormat(descEle?.textContent || '')

              // time
              const dateEle = ele.querySelector('.date')
              const date = htmlFormat(dateEle?.textContent || '')

              // tags
              const tagsEle = ele.querySelectorAll('.tag_list .tag')
              const tags = Array.from(tagsEle).map((ele) =>
                htmlFormat(ele.textContent || '')
              )

              return {
                url: 'https://juejin.cn' + url,
                title,
                cover,
                desc,
                date,
                tags
              }
            })
          )
        }
      }
    ]
  }
})
