import { UserRole } from '@/app/actions/auth'

export function canAccessAdminPanel(userRole: UserRole): boolean {
  return userRole === 'admin'
}

export function canManageLeads(userRole: UserRole): boolean {
  return userRole === 'admin'
}

export function canSubmitLead(userRole: UserRole): boolean {
  return userRole === 'user' || userRole === 'admin'
}

