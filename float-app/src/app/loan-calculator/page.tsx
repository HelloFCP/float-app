import Layout from '@/components/Layout'
import LoanCalculator from '@/components/LoanCalculator'

export default function LoanCalculatorPage() {
  return (
    <Layout title="Loan Calculator | Float App">
      <h1 className="text-3xl font-bold mb-6">Aircraft Loan Calculator</h1>
      <p className="mb-6">Use our calculator to estimate your monthly payments for aircraft financing.</p>
      <LoanCalculator />
    </Layout>
  )
}

