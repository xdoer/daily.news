import puppeteer from 'puppeteer-core'

export default {
  name: 'juejin',
  address: '',
  type: 'development',
  strategy: [
    {
      scene: 'javascript',
      async fn() {
        const browser = await puppeteer.launch({
          executablePath:
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
        })
        const page = await browser.newPage()
        await page.goto('https://www.baidu.com/')
        await page.screenshot({ path: 'example.png' })

        await browser.close()
      }
    },
    {
      scene: 'java',
      async fn() {
        const browser = await puppeteer.launch({
          executablePath:
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
        })
        const page = await browser.newPage()
        await page.goto('https://www.baidu.com/')
        await page.screenshot({ path: 'example.png' })

        await browser.close()
      }
    }
  ]
}
