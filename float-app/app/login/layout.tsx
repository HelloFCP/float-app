export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {children}
    </div>
  )
}

