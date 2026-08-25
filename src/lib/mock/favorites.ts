import { Favorite } from '../types'

const favorites: Favorite[] = [
  {
    id: 'fav-001',
    userId: 'user-001',
    jobId: 'job-002',
    createdAt: '2025-06-05T10:00:00Z',
  },
  {
    id: 'fav-002',
    userId: 'user-001',
    jobId: 'job-005',
    createdAt: '2025-06-06T14:30:00Z',
  },
  {
    id: 'fav-003',
    userId: 'user-001',
    jobId: 'job-009',
    createdAt: '2025-06-07T09:15:00Z',
  },
  {
    id: 'fav-004',
    userId: 'user-001',
    jobId: 'job-021',
    createdAt: '2025-06-08T16:00:00Z',
  },
]

export function getUserFavorites(userId: string): Favorite[] {
  return favorites.filter((f) => f.userId === userId)
}

export function addFavorite(userId: string, jobId: string): Favorite {
  const newFav: Favorite = {
    id: `fav-${Date.now()}`,
    userId,
    jobId,
    createdAt: new Date().toISOString(),
  }
  favorites.push(newFav)
  return newFav
}

export function removeFavorite(userId: string, jobId: string): void {
  const index = favorites.findIndex((f) => f.userId === userId && f.jobId === jobId)
  if (index >= 0) {
    favorites.splice(index, 1)
  }
}

export function isFavorited(userId: string, jobId: string): boolean {
  return favorites.some((f) => f.userId === userId && f.jobId === jobId)
}
