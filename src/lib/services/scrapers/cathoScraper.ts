import * as cheerio from 'cheerio'
import { Job } from '../../types'

const BASE_URL = 'https://www.catho.com.br'
const DETAIL_API = 'https://oferta.catho.com.br/offer/{0}/d/j?ipo=42&iapo=1'

interface CathoDetail {
  title?: string
  description?: string
  contractType?: string
  workMode?: string
  salary?: string
}

async function fetchCathoDetail(offerId: string): Promise<CathoDetail> {
  try {
    const url = DETAIL_API.replace('{0}', offerId)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/html, */*',
        'Referer': 'https://www.catho.com.br/',
      },
    })
    if (!response.ok) return {}
    const text = await response.text()
    try {
      const data = JSON.parse(text)
      return {
        title: data.o_t,
        description: data.o_ld,
        contractType: data.o_lsj,
        workMode: data.o_lset,
        salary: data.o_s,
      }
    } catch {
      return {}
    }
  } catch {
    return {}
  }
}

export async function scrapeCatho(): Promise<Job[]> {
  try {
    const response = await fetch(`${BASE_URL}/vagas/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    })

    if (!response.ok) {
      console.error(`[Catho] HTTP ${response.status}`)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const jobs: Job[] = []

    $('li[data-offer-item]').each((_, el) => {
      const card = $(el)
      const offerId = card.attr('data-offer-item') || ''

      const titleEl = card.find('h2.title_offer a')
      const title = titleEl.text().trim()
      const detailPath = titleEl.attr('href') || ''

      const company = card.find('.mb-2 span.text-12').first().text().trim()

      let city = ''
      let state = ''
      card.find('p').each((_, p) => {
        const text = $(p).text()
        if (text.includes('vaga') && text.includes('-')) {
          const match = text.match(/-\s*(.+)$/)
          if (match) {
            city = match[1].trim()
          }
        }
      })

      let salaryMin = 0
      let salaryMax = 0
      card.find('p').each((_, p) => {
        const text = $(p).text()
        if (text.includes('R$')) {
          const match = text.match(/R\$\s*([\d.,]+)/)
          if (match) {
            const val = parseFloat(match[1].replace(/\./g, '').replace(',', '.')) || 0
            salaryMin = val
            salaryMax = val
          }
        }
      })

      const sourceUrl = detailPath ? `${BASE_URL}${detailPath}` : `${BASE_URL}/vagas/`

      if (!title) return

      jobs.push({
        id: `catho-${offerId || Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        company: company || 'Empresa não informada',
        city: city || 'Não informado',
        state: state || 'NA',
        salaryMin,
        salaryMax,
        workMode: 'PRESENCIAL',
        contractType: 'CLT',
        experience: 'SEM_EXPERIENCIA',
        description: 'Descrição disponível no site original',
        requirements: [],
        benefits: [],
        source: 'Catho',
        sourceUrl,
        publishedAt: new Date().toISOString(),
        collectedAt: new Date().toISOString(),
        keywords: title.toLowerCase().split(/\s+/).filter(w => w.length > 2),
      })
    })

    console.log(`[Catho] Coletadas ${jobs.length} vagas`)
    return jobs
  } catch (error) {
    console.error('[Catho] Erro na coleta:', error)
    return []
  }
}
