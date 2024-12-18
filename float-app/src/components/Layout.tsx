import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

type LayoutProps = {
  children: React.ReactNode
  title?: string
}

const NavItems: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <div className="flex flex-wrap items-center">
      <Link href="/loan-calculator" className="text-white mr-4">
        Loan Calculator
      </Link>
      <Link href="/apply" className="text-white mr-4">
        Apply Now
      </Link>
      {user ? (
        <>
          <Link href="/dashboard" className="text-white mr-4">
            Dashboard
          </Link>
          <Button variant="outline" onClick={() => auth.signOut()}>
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-white mr-4">
            Login
          </Link>
          <Link href="/register" className="text-white">
            Register
          </Link>
        </>
      )}
    </div>
  )
}

const LayoutContent: React.FC<LayoutProps> = ({ children, title = 'Float App' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-blue-500 p-4">
        <nav className="container mx-auto flex flex-wrap justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Float
          </Link>
          <NavItems />
        </nav>
      </header>
      <main className="container mx-auto flex-grow p-4">{children}</main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          © {new Date().getFullYear()} Float App. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <AuthProvider>
      <LayoutContent {...props} />
    </AuthProvider>
  )
}

export default Layout

