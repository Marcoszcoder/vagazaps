import { Job } from '@/lib/types'

export type CollectorWeight = 'light' | 'heavy'

export interface CollectorTask {
  name: string
  weight: CollectorWeight
  execute: () => Promise<Job[]>
  timeoutMs?: number
}

interface QueueEntry {
  task: CollectorTask
  resolve: (jobs: Job[]) => void
  reject: (error: Error) => void
}

const MAX_CONCURRENT_HEAVY = 2
const MAX_CONCURRENT_LIGHT = 5
const DEFAULT_TIMEOUT_MS = 60_000

let runningHeavy = 0
let runningLight = 0
const queue: QueueEntry[] = []
let processing = false

function logStatus() {
  console.log(`[QUEUE] heavy running: ${runningHeavy}/${MAX_CONCURRENT_HEAVY} | light running: ${runningLight}/${MAX_CONCURRENT_LIGHT} | queued: ${queue.length}`)
}

function processQueue() {
  if (processing) return
  processing = true

  while (queue.length > 0) {
    const nextHeavy = queue.find(e => e.task.weight === 'heavy')
    const nextLight = queue.find(e => e.task.weight === 'light')

    if (nextHeavy && runningHeavy < MAX_CONCURRENT_HEAVY) {
      queue.splice(queue.indexOf(nextHeavy), 1)
      runCollector(nextHeavy)
    } else if (nextLight && runningLight < MAX_CONCURRENT_LIGHT) {
      queue.splice(queue.indexOf(nextLight), 1)
      runCollector(nextLight)
    } else {
      break
    }
  }

  processing = false
}

async function runCollector(entry: QueueEntry) {
  const { task, resolve, reject } = entry

  if (task.weight === 'heavy') runningHeavy++
  else runningLight++

  logStatus()
  console.log(`[${task.name}] [START] weight=${task.weight}`)

  const timeoutMs = task.timeoutMs || DEFAULT_TIMEOUT_MS
  let timedOut = false

  const timeout = setTimeout(() => {
    timedOut = true
    console.error(`[${task.name}] [TIMEOUT] after ${timeoutMs}ms`)
    reject(new Error(`Collector "${task.name}" timed out after ${timeoutMs}ms`))
  }, timeoutMs)

  try {
    const jobs = await task.execute()
    if (!timedOut) {
      console.log(`[${task.name}] [FINISHED] ${jobs.length} jobs`)
      resolve(jobs)
    }
  } catch (error) {
    if (!timedOut) {
      console.error(`[${task.name}] [ERROR]`, error)
      reject(error instanceof Error ? error : new Error(String(error)))
    }
  } finally {
    clearTimeout(timeout)
    if (task.weight === 'heavy') runningHeavy--
    else runningLight--
    logStatus()
    processQueue()
  }
}

export function enqueueCollector(task: CollectorTask): Promise<Job[]> {
  return new Promise((resolve, reject) => {
    queue.push({ task, resolve, reject })
    processQueue()
  })
}

export function getQueueStatus() {
  return {
    queueLength: queue.length,
    runningHeavy,
    runningLight,
    maxConcurrentHeavy: MAX_CONCURRENT_HEAVY,
    maxConcurrentLight: MAX_CONCURRENT_LIGHT,
  }
}
