'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function SiteHeader() {
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Float</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost">Dashboard</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/register">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

