'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, googleSignIn } from '../actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FloatLogo } from '@/components/float-logo'

export default function Login() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    const result = await login(formData)
    if (result && 'error' in result) {
      setError(result.error)
      setIsLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await googleSignIn()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-0">
      <div className="text-center">
        <FloatLogo className="text-3xl mx-auto" />
        <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-muted-foreground">Log in to your account</p>
      </div>
      <div className="flex justify-center mb-4">
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
          <FcGoogle className="mr-2 h-4 w-4" />
          Sign in with Google
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
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="pl-10 text-sm"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="pl-10 text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs sm:text-sm font-medium text-primary hover:text-primary/90">
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>
      </form>
      <div className="text-center">
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:text-primary/90">
            Get Started
          </Link>
        </p>
      </div>
    </div>
  )
}

