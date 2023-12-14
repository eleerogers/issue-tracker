import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Status } from '@prisma/client'

interface badgeProps {
  status: Status
}

const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
  OPEN: {label: 'Open', color: 'red' },
  CLOSED: {label: 'Closed', color: 'green' },
  IN_PROGRESS: {label: 'In Progress', color: 'violet'}
}

export default function IssueStatusBadge({status}: badgeProps) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}
