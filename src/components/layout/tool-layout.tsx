import { ReactNode } from 'react'

interface ToolLayoutProps {
  children: ReactNode
}

export function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}