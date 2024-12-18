import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Float - Aircraft Financing Made Simple',
  description: 'Finance your aircraft with Float. We offer competitive rates and flexible terms for all types of aircraft.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

