import { FC } from 'react'
import { User } from '@/app/actions/auth'

interface DashboardHeaderProps {
  user: User
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.name}</h1>
    </div>
  )
}

