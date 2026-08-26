import { JobSource } from '../types'

const sources: JobSource[] = [
  {
    id: 'src-001',
    name: 'Empregos.com.br',
    status: 'active',
    lastSync: new Date().toISOString(),
    type: 'scraping',
  },
  {
    id: 'src-002',
    name: 'Catho',
    status: 'active',
    lastSync: new Date().toISOString(),
    type: 'scraping',
  },
  {
    id: 'src-003',
    name: 'Gupy',
    status: 'active',
    lastSync: new Date().toISOString(),
    type: 'scraping',
  },
]

export function getAllSources(): JobSource[] {
  return [...sources]
}

export function getSourceById(id: string): JobSource | undefined {
  return sources.find((s) => s.id === id)
}
