'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '../actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FloatLogo } from '@/components/float-logo'

export default function Register() {
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = await register(formData)
    if (result && 'error' in result) {
      setError(result.error)
    } else {
      router.push('/dashboard')
    }
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
    if (password.match(/\d/)) strength += 25
    if (password.match(/[^a-zA-Z\d]/)) strength += 25
    return strength
  }

  const passwordStrength = calculatePasswordStrength(password)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="text-sm"
                />
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full mt-4">Next</Button>
          </>
        )
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <Progress value={passwordStrength} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  Password strength: {passwordStrength === 100 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak'}
                </p>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Get Started</Button>
          </>
        )
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-0">
      <div className="text-center">
        <FloatLogo className="text-3xl mx-auto" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Get Started</h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Create your account to start financing your aircraft</p>
      </div>
      <div className="flex justify-center mb-4">
        <Button variant="outline" className="w-full">
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div className="space-y-4">
          {renderStep()}
        </div>
      </form>
      <div className="text-center">
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary/90">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

