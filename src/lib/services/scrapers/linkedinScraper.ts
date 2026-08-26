import * as cheerio from 'cheerio'
import { Job } from '../../types'

const LINKEDIN_SEARCH_URL = 'https://www.linkedin.com/jobs/search?keywords=&location=Brazil&f_TPR=r604800&position=1&pageNum=0'

export async function scrapeLinkedIn(): Promise<Job[]> {
  console.log('[LinkedIn] Starting scraper (HTTP + cheerio)')

  try {
    const response = await fetch(LINKEDIN_SEARCH_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    })

    if (!response.ok) {
      console.error(`[LinkedIn] HTTP ${response.status}`)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const jobs: Job[] = []

    $('li').each((_, el) => {
      const card = $(el)

      const title = card.find('.base-search-card__title').text().trim()
      const company = card.find('.base-search-card__subtitle').text().trim()
      const location = card.find('.job-search-card__location').text().trim()
      const linkEl = card.find('a.base-card__full-link, a[href*="/jobs/view/"]').first()
      const dateEl = card.find('time')

      if (!title || !company) return

      let city = ''
      let state = ''
      if (location) {
        const parts = location.split(',').map(s => s.trim())
        if (parts.length >= 2) {
          city = parts[0]
          state = parts[1].substring(0, 2).toUpperCase()
        } else if (parts.length === 1) {
          city = parts[0]
        }
      }

      let sourceUrl = linkEl.attr('href') || ''
      sourceUrl = sourceUrl.split('?')[0]
      if (sourceUrl && !sourceUrl.startsWith('http')) {
        sourceUrl = `https://www.linkedin.com${sourceUrl}`
      }

      const postedAt = dateEl.attr('datetime') || ''

      jobs.push({
        id: `linkedin-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        company,
        city,
        state,
        salaryMin: 0,
        salaryMax: 0,
        workMode: 'PRESENCIAL' as Job['workMode'],
        contractType: 'CLT' as Job['contractType'],
        experience: 'SEM_EXPERIENCIA' as Job['experience'],
        description: `Vaga disponível no LinkedIn. Acesse o link para ver detalhes completos.`,
        requirements: [],
        benefits: [],
        source: 'LinkedIn',
        sourceUrl,
        publishedAt: postedAt ? new Date(postedAt).toISOString() : new Date().toISOString(),
        collectedAt: new Date().toISOString(),
        keywords: title.toLowerCase().split(/\s+/).filter(w => w.length > 2),
      })
    })

    console.log(`[LinkedIn] Collected ${jobs.length} jobs`)
    return jobs

  } catch (error) {
    console.error('[LinkedIn] Error:', error)
    throw error
  }
}