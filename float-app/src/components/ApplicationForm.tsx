'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    aircraftType: '',
    loanAmount: '',
  })
  const { user } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      aircraftType: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      alert('You must be logged in to submit an application')
      return
    }
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        userId: user.uid,
        status: 'Pending',
        createdAt: new Date(),
      })
      alert('Application submitted successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="aircraftType">Aircraft Type</Label>
        <Select onValueChange={handleSelectChange} value={formData.aircraftType}>
          <SelectTrigger>
            <SelectValue placeholder="Select aircraft type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="private">Private Jet</SelectItem>
            <SelectItem value="commercial">Commercial Airliner</SelectItem>
            <SelectItem value="helicopter">Helicopter</SelectItem>
            <SelectItem value="turboprop">Turboprop</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="loanAmount">Desired Loan Amount</Label>
        <Input
          id="loanAmount"
          name="loanAmount"
          type="number"
          value={formData.loanAmount}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Submit Application</Button>
    </form>
  )
}

export default ApplicationForm

