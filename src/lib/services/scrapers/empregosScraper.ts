import * as cheerio from 'cheerio'
import { Job } from '../../types'

const BASE_URL = 'https://www.empregos.com.br'

export async function scrapeEmpregos(): Promise<Job[]> {
  try {
    const response = await fetch(`${BASE_URL}/vagas`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
      },
    })

    if (!response.ok) {
      console.error(`[Empregos] HTTP ${response.status}`)
      return []
    }

    const html = await response.text()
    const $ = cheerio.load(html)
    const jobs: Job[] = []

    $('div#job-card, [id="job-card"]').each((_, el) => {
      const card = $(el)

      const title = card.find('h2 span').first().text().trim()
      const company = card.find('h3 a').first().text().trim()

      let city = ''
      let state = ''
      card.find('h3').each((_, h3) => {
        const text = $(h3).text().trim()
        if (text.includes(',')) {
          const parts = text.split(',').map(s => s.trim())
          if (parts.length === 2 && parts[1].length <= 2) {
            city = parts[0]
            state = parts[1]
          }
        }
      })

      let workMode: Job['workMode'] = 'PRESENCIAL'
      const cardText = card.text()
      if (cardText.includes('Remoto') || cardText.includes('Home Office')) workMode = 'REMOTO'
      else if (cardText.includes('Híbrido') || cardText.includes('Hibrido')) workMode = 'HIBRIDO'

      let salaryMin = 0
      let salaryMax = 0
      const salaryMatch = cardText.match(/R\$\s*([\d.,]+)/g)
      if (salaryMatch) {
        const salaries = salaryMatch.map(s => {
          const num = s.replace(/[R$\s.]/g, '').replace(',', '.')
          return parseFloat(num) || 0
        }).filter(n => n > 0)
        if (salaries.length >= 2) {
          salaryMin = Math.min(...salaries)
          salaryMax = Math.max(...salaries)
        } else if (salaries.length === 1) {
          salaryMin = salaries[0]
          salaryMax = salaries[0]
        }
      }

      let publishedAt = new Date().toISOString()
      const dateMatch = cardText.match(/Publicada?\s+(?:ha\s+)?(\d+)\s+(dia|horas?|minutos?)/i)
      if (dateMatch) {
        const num = parseInt(dateMatch[1])
        const unit = dateMatch[2].toLowerCase()
        const now = new Date()
        if (unit.startsWith('dia')) now.setDate(now.getDate() - num)
        else if (unit.startsWith('hora')) now.setHours(now.getHours() - num)
        else if (unit.startsWith('minuto')) now.setMinutes(now.getMinutes() - num)
        publishedAt = now.toISOString()
      }

      const description = card.find('[class*="line-clamp"]').first().text().trim()

      const detailPath = card.find('a[href*="/vaga/"]').first().attr('href') || ''
      const sourceUrl = detailPath ? `${BASE_URL}${detailPath}` : `${BASE_URL}/vagas/`

      if (!title) return

      jobs.push({
        id: `empregos-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title,
        company: company || 'Empresa não informada',
        city: city || 'Não informado',
        state: state || 'NA',
        salaryMin,
        salaryMax,
        workMode,
        contractType: 'CLT',
        experience: 'SEM_EXPERIENCIA',
        description: description || 'Descrição não disponível',
        requirements: [],
        benefits: [],
        source: 'Empregos.com.br',
        sourceUrl,
        publishedAt,
        collectedAt: new Date().toISOString(),
        keywords: title.toLowerCase().split(/\s+/).filter(w => w.length > 2),
      })
    })

    console.log(`[Empregos] Coletadas ${jobs.length} vagas`)
    return jobs
  } catch (error) {
    console.error('[Empregos] Erro na coleta:', error)
    return []
  }
}
