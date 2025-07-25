'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ToolCardProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export function ToolCard({ name, description, icon: Icon, href, color }: ToolCardProps) {
  return (
    <div className="animate-in fade-in-0 duration-300">
      <Card className="group h-full transition-all duration-300 hover:shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-white`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {name}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="mb-4 text-sm leading-relaxed">
            {description}
          </CardDescription>
          <Link href={href}>
            <Button size="sm" className="w-full group-hover:translate-x-1 transition-transform">
              Try it now
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}