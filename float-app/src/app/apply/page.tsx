import Layout from '@/components/Layout'
import ApplicationForm from '@/components/ApplicationForm'

export default function ApplyPage() {
  return (
    <Layout title="Apply for Financing | Float App">
      <h1 className="text-3xl font-bold mb-6">Apply for Aircraft Financing</h1>
      <p className="mb-6">Fill out the form below to apply for aircraft financing. We'll review your application and get back to you shortly.</p>
      <ApplicationForm />
    </Layout>
  )
}

