'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { updateLeadStatus } from '@/app/actions/leads'

export type Lead = {
  id: string
  name: string
  email: string
  phone: string
  aircraftType: string
  loanAmount: number
  status: string
  createdAt: Date
}

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'aircraftType',
    header: 'Aircraft Type',
  },
  {
    accessorKey: 'loanAmount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Loan Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('loanAmount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString()
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const lead = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, 'CONTACTED')}>
              Mark as Contacted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, 'QUALIFIED')}>
              Mark as Qualified
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, 'CLOSED')}>
              Mark as Closed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

