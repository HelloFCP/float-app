'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FloatLogo } from '@/components/float-logo'
import { sendPasswordResetEmail } from '../actions/auth'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setError(null)

    try {
      await sendPasswordResetEmail(email)
      setMessage('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError('Failed to send password reset email. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-0">
      <div className="text-center">
        <FloatLogo className="text-3xl mx-auto" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email to receive a password reset link</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {message && <div className="text-green-500 text-center text-sm">{message}</div>}
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm"
            placeholder="john@example.com"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>
  )
}

