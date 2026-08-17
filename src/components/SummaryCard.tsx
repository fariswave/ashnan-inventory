import React from 'react'
import { Card } from './Card'

interface SummaryCardProps {
  title: string
  value: number | string
  icon: string
  bgColor?: string
  iconBgColor?: string
  description?: string
}

export function SummaryCard({
  title,
  value,
  icon,
  bgColor = 'bg-amber-50/40',
  iconBgColor = 'bg-amber-200/40',
  description,
}: SummaryCardProps) {
  return (
    <Card className={`${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-amber-700/70 uppercase tracking-wide mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-amber-950">{value}</p>
          {description && (
            <p className="text-xs text-amber-700/60 mt-1">{description}</p>
          )}
        </div>
        <div
          className={`${iconBgColor} rounded-2xl p-3 flex items-center justify-center text-xl flex-shrink-0`}
        >
          {icon}
        </div>
      </div>
    </Card>
  )
}
