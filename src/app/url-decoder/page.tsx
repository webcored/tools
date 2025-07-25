'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'
import { processUrl } from '@/lib/url-utils'

export default function UrlDecoderPage() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const result = processUrl(input, mode)

  const handleCopy = useCallback(async () => {
    if (result.result) {
      try {
        await navigator.clipboard.writeText(result.result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
      }
    }
  }, [result.result])

  return (
    <ToolLayout>
      <ToolHeader
        title="URL Encode / Decode"
        description="Encode and decode URLs, convert special characters and handle URL-safe formatting."
      />
      
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Mode</label>
            <Select value={mode} onValueChange={(value: 'encode' | 'decode') => setMode(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="encode">Encode</SelectItem>
                <SelectItem value="decode">Decode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Input</label>
            <Textarea
              placeholder="Enter text to encode or decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Result</h3>
                {result.result && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {result.error ? (
                <div className="text-sm text-destructive p-3 bg-destructive/10 rounded-md">
                  {result.error}
                </div>
              ) : (
                <div className="min-h-[80px] p-3 bg-muted rounded-md font-mono text-sm break-all">
                  {result.result || (
                    <span className="text-muted-foreground">
                      {input ? 'Processing...' : 'Enter text above to see results'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  )
}