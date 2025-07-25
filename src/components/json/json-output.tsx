import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Check, BarChart3, Minimize2, Maximize2 } from 'lucide-react'
import { formatJson, minifyJson, getJsonStats, JsonStats } from '@/lib/json-utils'
import { cn } from '@/lib/utils'
import JsonView from '@uiw/react-json-view'

interface JsonOutputProps {
  jsonData: any
  className?: string
  error?: string
}

type ViewMode = 'tree' | 'formatted' | 'minified'

export function JsonOutput({ jsonData, className, error }: JsonOutputProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('tree')
  const [copied, setCopied] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const stats = jsonData ? getJsonStats(jsonData) : null

  const handleCopy = async () => {
    if (!jsonData) return
    
    try {
      let content = ''
      switch (viewMode) {
        case 'tree':
        case 'formatted':
          content = formatJson(jsonData, { indent: 2, sortKeys: false })
          break
        case 'minified':
          content = minifyJson(jsonData)
          break
      }
      
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy JSON:', err)
    }
  }

  const handleDownload = () => {
    if (!jsonData) return
    
    try {
      let content = ''
      let filename = 'data.json'
      
      switch (viewMode) {
        case 'tree':
        case 'formatted':
          content = formatJson(jsonData, { indent: 2, sortKeys: false })
          filename = 'formatted-data.json'
          break
        case 'minified':
          content = minifyJson(jsonData)
          filename = 'minified-data.json'
          break
      }
      
      const blob = new Blob([content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to download JSON:', err)
    }
  }

  if (error) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-destructive">JSON Error</h3>
        </div>
        
        <div className="min-h-[400px] p-4 border-2 border-dashed border-destructive/30 rounded-lg bg-destructive/5">
          <div className="flex items-start gap-2">
            <div className="text-destructive text-sm">
              <div className="font-medium mb-2">Invalid JSON:</div>
              <div className="whitespace-pre-wrap">{error}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!jsonData) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">JSON Output</h3>
        </div>
        
        <div className="min-h-[400px] p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/20">
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <div className="text-4xl mb-4">📝</div>
            <div className="text-lg font-medium mb-2">No Valid JSON</div>
            <div className="text-sm">
              Paste valid JSON in the input panel to see the formatted output here
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'tree':
        return (
          <JsonView
            value={jsonData}
            collapsed={isCollapsed ? 1 : false}
            displayDataTypes={false}
            style={{
              backgroundColor: 'transparent',
              fontSize: '13px',
            }}
          />
        )
      
      case 'formatted':
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap break-words p-4 bg-muted/20 rounded border overflow-auto max-h-[400px]">
            {formatJson(jsonData, { indent: 2, sortKeys: false })}
          </pre>
        )
      
      case 'minified':
        return (
          <pre className="text-sm font-mono whitespace-pre-wrap break-all p-4 bg-muted/20 rounded border overflow-auto max-h-[400px]">
            {minifyJson(jsonData)}
          </pre>
        )
      
      default:
        return null
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">JSON Output</h3>
          {stats && (
            <Badge variant="secondary" className="text-xs">
              {stats.objects} objects, {stats.arrays} arrays
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'tree' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tree')}
              className="rounded-r-none border-r"
            >
              Tree
            </Button>
            <Button
              variant={viewMode === 'formatted' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('formatted')}
              className="rounded-none border-r"
            >
              Formatted
            </Button>
            <Button
              variant={viewMode === 'minified' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('minified')}
              className="rounded-l-none"
            >
              Minified
            </Button>
          </div>
          
          {/* Tree Controls */}
          {viewMode === 'tree' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          )}
          
          {/* Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && stats && (
        <div className="p-3 border rounded-lg bg-muted/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground">Size</div>
              <div>{stats.size} chars</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Lines</div>
              <div>{stats.lines}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Keys</div>
              <div>{stats.keys}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Objects</div>
              <div>{stats.objects}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Arrays</div>
              <div>{stats.arrays}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Strings</div>
              <div>{stats.strings}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Numbers</div>
              <div>{stats.numbers}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Booleans</div>
              <div>{stats.booleans}</div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="min-h-[400px] border rounded-lg overflow-hidden">
        {renderContent()}
      </div>
    </div>
  )
}