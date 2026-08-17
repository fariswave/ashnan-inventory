import React from 'react'
import { Card } from './Card'

interface EmptyStateProps {
  title: string
  description: string
  icon: string
  actionText?: string
  onAction?: () => void
}

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="text-center py-12 bg-gradient-to-b from-amber-50/60 to-orange-50/30">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-amber-950 mb-2">{title}</h3>
      <p className="text-sm text-amber-700/70 mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          {actionText}
        </button>
      )}
    </Card>
  )
}
