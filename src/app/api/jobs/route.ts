import { NextResponse } from 'next/server'
import { getAllJobs } from '@/lib/mock/jobs'

export async function GET() {
  const jobs = getAllJobs()
  return NextResponse.json({ jobs, total: jobs.length })
}
