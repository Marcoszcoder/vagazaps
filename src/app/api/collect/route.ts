import { NextResponse } from 'next/server'
import { collectFromAllSources } from '@/lib/services/jobCollectionService'
import { getAllJobs } from '@/lib/mock/jobs'
import { getAllUsers } from '@/lib/mock/users'
import { getUserPreference } from '@/lib/mock/preferences'
import { calculateMatchScore } from '@/lib/services/matchingService'
import { addNotification } from '@/lib/mock/notifications'

const DAILY_LIMIT = 100
let dailyCount = 0
let lastResetDate = new Date().toDateString()

function checkDailyLimit(): boolean {
  const today = new Date().toDateString()
  if (today !== lastResetDate) {
    dailyCount = 0
    lastResetDate = today
  }
  return dailyCount < DAILY_LIMIT
}

export async function POST() {
  try {
    if (!checkDailyLimit()) {
      return NextResponse.json({
        success: true,
        newJobs: 0,
        totalNotifications: 0,
        results: [],
        jobs: getAllJobs(),
        dailyLimit: true,
        message: `Limite diário de ${DAILY_LIMIT} vagas atingido.`,
      })
    }

    const remaining = DAILY_LIMIT - dailyCount
    const { newJobs, results } = await collectFromAllSources()
    
    const cappedNewJobs = newJobs.slice(0, remaining)
    dailyCount += cappedNewJobs.length

    let totalNotifications = 0
    const users = getAllUsers()

    for (const job of cappedNewJobs) {
      for (const user of users) {
        const pref = getUserPreference(user.id)
        if (!pref) continue
        const match = calculateMatchScore(pref, job)
        if (match.score >= 50) {
          addNotification({
            userId: user.id,
            jobId: job.id,
            type: match.score >= 70 ? 'HIGH_MATCH' : 'NEW_JOB',
            title: match.score >= 70 ? '⭐ Vaga com alta compatibilidade' : '🚨 Nova vaga encontrada',
            message: `${job.title} - ${job.company} | ${job.city} | Compatibilidade: ${match.score}%`,
            status: 'UNREAD',
            sentAt: new Date().toISOString(),
          })
          totalNotifications++
        }
      }
    }

    const allJobs = getAllJobs()

    return NextResponse.json({
      success: true,
      newJobs: cappedNewJobs.length,
      totalNotifications,
      results,
      jobs: allJobs,
      dailyCount,
      dailyLimit: DAILY_LIMIT,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}