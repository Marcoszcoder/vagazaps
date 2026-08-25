import { JobSource } from '../types'

const sources: JobSource[] = [
  {
    id: 'src-001',
    name: 'InfoJobs Mock',
    status: 'active',
    lastSync: '2025-06-01T08:00:00Z',
    type: 'mock',
  },
  {
    id: 'src-002',
    name: 'VagasBR Mock',
    status: 'active',
    lastSync: '2025-06-01T07:30:00Z',
    type: 'mock',
  },
  {
    id: 'src-003',
    name: 'Empregos.com Mock',
    status: 'inactive',
    lastSync: '2025-05-15T12:00:00Z',
    type: 'mock',
  },
]

export function getAllSources(): JobSource[] {
  return [...sources]
}

export function getSourceById(id: string): JobSource | undefined {
  return sources.find((s) => s.id === id)
}
