import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant: 'green' | 'blue' | 'yellow' | 'gray' | 'red'
}

const variantMap = {
  green: 'bg-green-50 text-green-700',
  blue: 'bg-blue-50 text-blue-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  gray: 'bg-gray-100 text-gray-600',
  red: 'bg-red-50 text-red-700',
}

export default function Badge({ children, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantMap[variant]}`}
    >
      {children}
    </span>
  )
}
