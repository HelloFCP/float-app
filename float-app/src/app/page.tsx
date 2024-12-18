import Layout from '@/components/Layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <Layout title="Home | Float App">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Float</h1>
        <p className="text-xl mb-6">Discover financing options for a wide range of aircraft, tailored to your needs.</p>
        <div className="space-x-4">
          <Link href="/loan-calculator">
            <Button size="lg">Try Our Loan Calculator</Button>
          </Link>
          <Link href="/apply">
            <Button size="lg" variant="outline">Apply for Financing</Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

