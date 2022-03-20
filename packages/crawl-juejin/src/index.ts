import { Crawl } from '@daily.news/types'

export default <Crawl>(() => {
  return {
    name: 'juejin',
    site: 'https://juejin.cn/',
    strategy: [
      {
        scene: 'javascript',
        async fn(page) {
          await page.goto('https://www.baidu.com/')
          return [
            {
              title: '',
              image: '',
              desc: '',
              url: ''
            }
          ]
        }
      },
      {
        scene: 'java',
        async fn(page) {
          await page.goto('https://www.baidu.com/')
          return [
            {
              title: '',
              image: '',
              desc: '',
              url: ''
            }
          ]
        }
      }
    ]
  }
})
