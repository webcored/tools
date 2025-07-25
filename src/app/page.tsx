'use client'

import { motion } from 'framer-motion'
import { Clock, Calculator, Code, Link } from 'lucide-react'
import { ToolCard } from '@/components/tools/tool-card'
import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'

const tools = [
  {
    id: 'countdown-timer',
    name: 'Count Down Timer',
    description: 'Create and manage multiple countdown timers for events, deadlines, and special occasions.',
    icon: Clock,
    href: '/countdown-timer',
    color: 'bg-blue-500',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increases, decreases, and find what percent one number is of another.',
    icon: Calculator,
    href: '/percentage-calculator',
    color: 'bg-green-500',
  },
  {
    id: 'json-viewer',
    name: 'JSON Viewer / parser',
    description: 'View, format, validate and parse JSON data with syntax highlighting and error detection.',
    icon: Code,
    href: '/json-viewer',
    color: 'bg-purple-500',
  },
  {
    id: 'url-decoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode and decode URLs, convert special characters and handle URL-safe formatting.',
    icon: Link,
    href: '/url-decoder',
    color: 'bg-orange-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function HomePage() {
  return (
    <ToolLayout>
      <ToolHeader
        title="Available Tools"
        description="Choose from our collection of useful utilities and tools."
      />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
        {tools.map((tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </ToolLayout>
  )
}