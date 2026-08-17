import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-card rounded-2xl p-4 shadow-sm border border-amber-100/30 ${className}`}>
      {children}
    </div>
  )
}
