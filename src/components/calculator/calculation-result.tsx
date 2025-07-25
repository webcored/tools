import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { CalculationResult } from '@/lib/percentage'

interface CalculationResultProps {
  result: CalculationResult | null
  label?: string
  className?: string
}

export function CalculationResultDisplay({ result, label = 'Result:', className }: CalculationResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!result?.isValid || !result.formatted) return
    
    try {
      await navigator.clipboard.writeText(result.formatted)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy result:', err)
    }
  }

  const displayValue = () => {
    if (!result) return ''
    
    if (!result.isValid) {
      return result.error || 'Invalid calculation'
    }
    
    return result.formatted || '0'
  }

  const shouldShowCopy = result?.isValid && result?.formatted && result.formatted !== '0'

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
        {shouldShowCopy && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 px-2 text-xs"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        )}
      </div>
      
      <div className={`
        min-h-[60px] p-4 rounded-lg border-2 border-dashed flex items-center justify-center
        ${result?.isValid 
          ? 'border-border bg-muted/20' 
          : result?.error 
            ? 'border-destructive/30 bg-destructive/5' 
            : 'border-muted-foreground/20'
        }
      `}>
        <div className={`
          text-xl font-mono font-semibold text-center
          ${result?.isValid 
            ? 'text-foreground' 
            : result?.error 
              ? 'text-destructive text-sm font-normal' 
              : 'text-muted-foreground'
          }
        `}>
          {displayValue()}
        </div>
      </div>
    </div>
  )
}