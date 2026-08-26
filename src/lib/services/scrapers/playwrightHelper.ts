import { Browser, BrowserContext, Page } from 'playwright'

export interface BrowserSession {
  browser: Browser
  context: BrowserContext
  page: Page
}

export async function createBrowserSession(): Promise<BrowserSession> {
  console.log('[BROWSER START] Launching minimal Chromium')

  const { chromium } = await import('playwright')

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-extensions',
    ],
  })

  console.log('[BROWSER STARTED] Chromium launched')

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 },
    javaScriptEnabled: true,
  })

  await context.route('**/*', (route) => {
    const type = route.request().resourceType()
    const blocked = ['image', 'media', 'font', 'stylesheet']
    if (blocked.includes(type)) {
      route.abort()
    } else {
      route.continue()
    }
  })

  const page = await context.newPage()
  console.log('[PAGE START] New page created')

  return { browser, context, page }
}

export async function closeBrowserSession(session: BrowserSession | null, caller: string): Promise<void> {
  if (!session) return

  try {
    if (session.page && !session.page.isClosed()) {
      await session.page.close()
      console.log(`[${caller}] [PAGE CLOSED]`)
    }
  } catch (e) {
    console.error(`[${caller}] [PAGE CLOSE ERROR]`, e)
  }

  try {
    if (session.context) {
      await session.context.close()
      console.log(`[${caller}] [CONTEXT CLOSED]`)
    }
  } catch (e) {
    console.error(`[${caller}] [CONTEXT CLOSE ERROR]`, e)
  }

  try {
    if (session.browser && session.browser.isConnected()) {
      await session.browser.close()
      console.log(`[${caller}] [BROWSER CLOSED]`)
    }
  } catch (e) {
    console.error(`[${caller}] [BROWSER CLOSE ERROR]`, e)
  }
}

export async function withBrowser<T>(
  collectorName: string,
  fn: (session: BrowserSession) => Promise<T>
): Promise<T> {
  let session: BrowserSession | null = null
  try {
    session = await createBrowserSession()
    console.log(`[${collectorName}] [COLLECTING]`)
    return await fn(session)
  } finally {
    await closeBrowserSession(session, collectorName)
  }
}
