import { getLeads } from '@/app/actions/leads'
import { DataTable } from '@/components/admin/data-table'
import { columns } from './columns'

export default async function LeadsPage() {
  const { leads, error } = await getLeads()

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Leads Dashboard</h1>
      <DataTable columns={columns} data={leads || []} />
    </div>
  )
}

