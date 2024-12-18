import { getSession } from '../actions/auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'
import { canAccessAdminPanel } from '@/lib/rbac'

export default async function Dashboard() {
  const user = await getSession()

  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader user={user} />
      {canAccessAdminPanel(user.role) ? (
        <AdminDashboard />
      ) : (
        <DashboardContent user={user} />
      )}
    </DashboardShell>
  )
}

