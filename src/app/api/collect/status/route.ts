import { NextResponse } from 'next/server'
import { getAllJobs } from '@/lib/mock/jobs'
import { getAllSources } from '@/lib/mock/sources'

export async function GET() {
  const jobs = getAllJobs()
  const sources = getAllSources()

  const realJobs = jobs.filter(j => j.source === 'Empregos.com.br' || j.source === 'Catho')
  const mockJobs = jobs.filter(j => j.source !== 'Empregos.com.br' && j.source !== 'Catho' && j.source !== 'Manual')

  return NextResponse.json({
    totalJobs: jobs.length,
    realJobs: realJobs.length,
    mockJobs: mockJobs.length,
    sources: sources.map(s => ({
      name: s.name,
      status: s.status,
      type: s.type,
    })),
  })
}
