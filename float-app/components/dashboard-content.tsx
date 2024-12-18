import { FC } from 'react'
import { UserData } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, DollarSign, FileText, Bell } from 'lucide-react'
import { getLeads } from '@/app/actions/leads'

interface DashboardContentProps {
  user: UserData
}

export const DashboardContent: FC<DashboardContentProps> = async ({ user }) => {
  const { leads } = await getLeads()
  const leadCount = leads?.length || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Leads
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leadCount}</div>
          <p className="text-xs text-muted-foreground">
            {leadCount > 0 ? `${leadCount} leads submitted` : 'No leads yet'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            User Role
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{user.role}</div>
          <p className="text-xs text-muted-foreground">
            Your current access level
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Account Created
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{new Date(user.createdAt).toLocaleDateString()}</div>
          <p className="text-xs text-muted-foreground">
            Date you joined Float
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Last Login
          </CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{new Date(user.lastLogin).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Your last login time
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account and leads</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button className="w-full">Submit New Lead</Button>
          <Button className="w-full" variant="outline">View My Leads</Button>
          <Button className="w-full" variant="outline">Account Settings</Button>
          <Button className="w-full" variant="outline">Support</Button>
        </CardContent>
      </Card>
    </div>
  )
}

