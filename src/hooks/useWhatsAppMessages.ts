'use client'

import { useCallback, useRef } from 'react'
import { sendWhatsAppMessage, getWelcomeMessage, getJobMessage, getFollowUpMessage } from '@/lib/services/whatsappApi'
import { Job } from '@/lib/types'

interface ScheduledMessages {
  welcomeTimer: ReturnType<typeof setTimeout> | null
  firstJobTimer: ReturnType<typeof setTimeout> | null
  intervalId: ReturnType<typeof setInterval> | null
}

export function useWhatsAppMessages() {
  const timersRef = useRef<ScheduledMessages>({
    welcomeTimer: null,
    firstJobTimer: null,
    intervalId: null,
  })

  const clearAllTimers = useCallback(() => {
    const t = timersRef.current
    if (t.welcomeTimer) clearTimeout(t.welcomeTimer)
    if (t.firstJobTimer) clearTimeout(t.firstJobTimer)
    if (t.intervalId) clearInterval(t.intervalId)
    timersRef.current = { welcomeTimer: null, firstJobTimer: null, intervalId: null }
  }, [])

  const startMessageFlow = useCallback((phone: string, userName: string, jobs: Job[]) => {
    clearAllTimers()

    const jobsWithScore = jobs
      .map((job) => {
        let score = 50
        if (job.salaryMin && job.salaryMin >= 3000) score += 20
        if (job.city && job.city.toLowerCase().includes('curitiba')) score += 15
        if (job.title && (job.title.toLowerCase().includes('dev') || job.title.toLowerCase().includes('full stack'))) score += 15
        return { job, score: Math.min(score, 98) }
      })
      .sort((a, b) => b.score - a.score)

    let jobIndex = 0

    const sendNextJob = async () => {
      if (jobsWithScore.length === 0) return
      const { job, score } = jobsWithScore[jobIndex % jobsWithScore.length]
      const msg = getJobMessage(job, score)
      await sendWhatsAppMessage(phone, msg)
      jobIndex++
    }

    sendWhatsAppMessage(phone, getWelcomeMessage(userName))

    timersRef.current.welcomeTimer = setTimeout(async () => {
      await sendNextJob()

      timersRef.current.intervalId = setInterval(async () => {
        await sendNextJob()
      }, 5 * 60 * 1000)
    }, 2 * 60 * 1000)
  }, [clearAllTimers])

  return { startMessageFlow, clearAllTimers }
}
