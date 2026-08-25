import { NextResponse } from 'next/server'
import { collectFromAllSources } from '@/lib/services/jobCollectionService'
import { getAllUsers } from '@/lib/mock/users'
import { getUserPreference } from '@/lib/mock/preferences'
import { calculateMatchScore } from '@/lib/services/matchingService'
import { addNotification } from '@/lib/mock/notifications'

export async function POST() {
  try {
    const { newJobs, results } = await collectFromAllSources()

    let totalNotifications = 0
    const users = getAllUsers()

    for (const job of newJobs) {
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

    return NextResponse.json({
      success: true,
      newJobs: newJobs.length,
      totalNotifications,
      results,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
    }, { status: 500 })
  }
}
