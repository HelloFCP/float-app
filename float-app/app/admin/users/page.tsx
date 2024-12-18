import { getUsers, updateUserRole } from '@/app/actions/admin'
import { DataTable } from '@/components/admin/data-table'
import { columns } from './columns'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}

