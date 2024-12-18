import { FC, ReactNode } from 'react'

interface DashboardShellProps {
  children: ReactNode
}

export const DashboardShell: FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          {/* Add sidebar navigation here if needed */}
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}

