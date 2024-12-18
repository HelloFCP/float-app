import { getLeads } from '@/app/actions/leads'
import { DataTable } from '@/components/admin/data-table'
import { columns } from '@/app/admin/leads/columns'

export async function AdminDashboard() {
  const { leads, error } = await getLeads()

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <DataTable columns={columns} data={leads || []} />
    </div>
  )
}

