import puppeteer from 'puppeteer-core'

async function getBrowser() {
  return puppeteer.launch({
    executablePath:
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
  })
}

export { getBrowser }
