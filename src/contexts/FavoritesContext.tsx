'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Favorite } from '@/lib/types'
import { getUserFavorites, addFavorite as addFav, removeFavorite as removeFav, isFavorited as checkFavorited } from '@/lib/mock/favorites'
import { useAuth } from './AuthContext'

interface FavoritesContextType {
  favorites: Favorite[]
  toggleFavorite: (jobId: string) => void
  isFavorited: (jobId: string) => boolean
  refresh: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const { user } = useAuth()

  const refresh = useCallback(() => {
    if (user) setFavorites(getUserFavorites(user.id))
  }, [user])

  useState(() => {
    if (user) setFavorites(getUserFavorites(user.id))
  })

  const toggleFavorite = (jobId: string) => {
    if (!user) return
    if (checkFavorited(user.id, jobId)) {
      removeFav(user.id, jobId)
    } else {
      addFav(user.id, jobId)
    }
    setFavorites(getUserFavorites(user.id))
  }

  const isFav = (jobId: string) => {
    if (!user) return false
    return checkFavorited(user.id, jobId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited: isFav, refresh }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
