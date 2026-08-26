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

      // City: <img src="...location-on-outline.svg"> next sibling <h3 title="City, ST">
      let city = ''
      let state = ''
      const validStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']
      
      card.find('img').each((_, img) => {
        const src = $(img).attr('src') || ''
        if (src.includes('location-on-outline')) {
          const nextH3 = $(img).next('h3')
          if (nextH3.length > 0) {
            const locationText = nextH3.attr('title') || nextH3.text().trim()
            const parts = locationText.split(',').map(s => s.trim())
            if (parts.length >= 2) {
              city = parts[0]
              const stateCode = parts[1].substring(0, 2).toUpperCase()
              if (validStates.includes(stateCode)) {
                state = stateCode
              }
            } else if (parts.length === 1 && parts[0]) {
              city = parts[0]
            }
          }
        }
      })

      // Work mode: <img src="...emoji-people.svg"> next sibling <span>
      let workMode: Job['workMode'] = 'PRESENCIAL'
      card.find('img').each((_, img) => {
        const src = $(img).attr('src') || ''
        if (src.includes('emoji-people')) {
          const text = $(img).next('span').text().trim()
          if (text.includes('Remoto') || text.toLowerCase().includes('home office')) workMode = 'REMOTO'
          else if (text.includes('Híbrido') || text.includes('Hibrido')) workMode = 'HIBRIDO'
        }
      })

      // Salary: <img src="...payments-outline.svg"> next sibling <h3>
      let salaryMin = 0
      let salaryMax = 0
      card.find('img').each((_, img) => {
        const src = $(img).attr('src') || ''
        if (src.includes('payments-outline')) {
          const salaryText = $(img).next('h3').text().trim()
          if (salaryText && !salaryText.toLowerCase().includes('combinar')) {
            const vals = salaryText.match(/R\$\s*([\d.,]+)/g)
            if (vals) {
              const numbers = vals.map(v => {
                return parseFloat(v.replace(/[R$\s.]/g, '').replace(',', '.')) || 0
              }).filter(n => n > 0)
              if (numbers.length >= 2) {
                salaryMin = Math.min(...numbers)
                salaryMax = Math.max(...numbers)
              } else if (numbers.length === 1) {
                salaryMin = numbers[0]
                salaryMax = numbers[0]
              }
            }
          }
        }
      })

      // Publication date
      let publishedAt = new Date().toISOString()
      const cardText = card.text()
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
