import { Job, JobFilters } from '../types'

const jobs: Job[] = []

export function getAllJobs(): Job[] {
  return [...jobs]
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id)
}

export function addJob(job: Job): void {
  jobs.push(job)
}

export function getJobsByFilters(filters: JobFilters): Job[] {
  let result = [...jobs]

  if (filters.city) {
    result = result.filter((j) => j.city.toLowerCase().includes(filters.city!.toLowerCase()))
  }
  if (filters.state) {
    result = result.filter((j) => j.state === filters.state)
  }
  if (filters.title) {
    const term = filters.title.toLowerCase()
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        j.keywords.some((k) => k.toLowerCase().includes(term))
    )
  }
  if (filters.salaryMin !== undefined) {
    result = result.filter((j) => j.salaryMax >= filters.salaryMin!)
  }
  if (filters.salaryMax !== undefined) {
    result = result.filter((j) => j.salaryMin <= filters.salaryMax!)
  }
  if (filters.workMode) {
    result = result.filter((j) => j.workMode === filters.workMode)
  }
  if (filters.experience) {
    result = result.filter((j) => j.experience === filters.experience)
  }
  if (filters.contractType) {
    result = result.filter((j) => j.contractType === filters.contractType)
  }

  if (filters.sortBy === 'recent') {
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  } else if (filters.sortBy === 'salary') {
    result.sort((a, b) => b.salaryMax - a.salaryMax)
  }

  return result
}
