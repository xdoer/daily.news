import { CrawlExt } from '@daily.news/types'

export default <CrawlExt.Main>(() => {
  return {
    name: 'juejin',
    site: 'https://juejin.cn/',
    logo: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg',
    updateInterval: 3,
    strategies: [
      {
        tags: ['frontend'],
        url: 'https://juejin.cn/frontend',
        async fn(page) {
          return page.$$eval('.entry', (els) => {
            function htmlFormat(text = '') {
              return text.replace(/(\s|\t|\n)+/g, '')
            }
            return els.map((ele) => {
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

              // 作者
              const authorEle = ele.querySelector('.user-message')
              const author = htmlFormat(authorEle?.textContent || '')

              return {
                url: 'https://juejin.cn' + url,
                title,
                cover,
                desc,
                date,
                tags,
                author
              }
            })
          })
        }
      }
    ]
  }
})
