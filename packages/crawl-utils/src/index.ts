import { launch } from 'puppeteer-core'

async function getBrowser() {
  const executablePath =
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
  return launch({ executablePath })
}

export { getBrowser }
