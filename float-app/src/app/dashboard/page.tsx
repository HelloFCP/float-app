'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Application {
  id: string
  aircraftType: string
  loanAmount: number
  status: string
  createdAt: Date
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        const q = query(collection(db, 'applications'), where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const apps: Application[] = []
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() } as Application)
        })
        setApplications(apps)
      }
    }

    fetchApplications()
  }, [user])

  if (loading) return <div>Loading...</div>

  return (
    <Layout title="Dashboard | Float App">
      <h1 className="text-3xl font-bold mb-6">Your Applications</h1>
      {applications.length === 0 ? (
        <p>You haven't submitted any applications yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aircraft Type</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.aircraftType}</TableCell>
                <TableCell>${app.loanAmount.toLocaleString()}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>{app.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button className="mt-6" onClick={() => router.push('/apply')}>
        Submit New Application
      </Button>
    </Layout>
  )
}

