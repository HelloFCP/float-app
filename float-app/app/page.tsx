import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Welcome to Float</h1>
      <p className="text-xl mb-8">Discover financing options for a wide range of aircraft, tailored to your needs.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/apply">Apply Now</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/loan-calculator">Try Our Loan Calculator</Link>
        </Button>
      </div>
    </div>
  )
}

