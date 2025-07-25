import { ReactNode } from 'react'

interface ToolHeaderProps {
  title: string
  description: string
  action?: ReactNode
}

export function ToolHeader({ title, description, action }: ToolHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  )
}