import React from 'react'
import { Card } from './Card'

interface ActivityItem {
  id: string
  description: string
  timestamp: string
  icon: string
}

interface RecentActivityProps {
  activities?: ActivityItem[]
}

const defaultActivities: ActivityItem[] = [
  {
    id: '1',
    description: 'Added 24 units of Tomato',
    timestamp: 'Today at 10:30 AM',
    icon: '🍅',
  },
  {
    id: '2',
    description: 'Updated Lettuce stock',
    timestamp: 'Today at 9:15 AM',
    icon: '🥬',
  },
  {
    id: '3',
    description: 'Marked Spinach as expired',
    timestamp: 'Yesterday at 2:45 PM',
    icon: '🌱',
  },
  {
    id: '4',
    description: 'Created new batch: Carrots',
    timestamp: 'Yesterday at 11:20 AM',
    icon: '🥕',
  },
]

export function RecentActivity({ activities = defaultActivities }: RecentActivityProps) {
  return (
    <div className="mt-6">
      <h2 className="text-sm font-bold text-amber-950 uppercase tracking-wide mb-3 px-1">
        Recent Activity
      </h2>
      <div className="space-y-2">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <Card key={activity.id} className="bg-gradient-to-r from-amber-50/50 to-orange-50/30">
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-amber-950 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-amber-700/60">{activity.timestamp}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-6 bg-amber-50/30">
            <p className="text-sm text-amber-700/60">No recent activities</p>
          </Card>
        )}
      </div>
    </div>
  )
}
