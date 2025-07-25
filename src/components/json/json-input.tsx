import { forwardRef, useEffect, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload, FileText, RotateCcw } from 'lucide-react'
import { validateJson, SAMPLE_JSON_DATA, looksLikeJson } from '@/lib/json-utils'
import { cn } from '@/lib/utils'

interface JsonInputProps {
  value: string
  onChange: (value: string) => void
  onValidationChange: (isValid: boolean, error?: string) => void
  className?: string
  placeholder?: string
}

export const JsonInput = forwardRef<HTMLTextAreaElement, JsonInputProps>(
  ({ value, onChange, onValidationChange, className, placeholder = "Paste your JSON here..." }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Validate JSON whenever value changes
    useEffect(() => {
      if (!value.trim()) {
        onValidationChange(true) // Empty is considered valid
        return
      }

      const result = validateJson(value)
      onValidationChange(result.isValid, result.error)
    }, [value, onValidationChange])

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (content) {
          onChange(content)
        }
      }
      reader.readAsText(file)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    const handleClear = () => {
      onChange('')
    }

    const loadSample = (sampleKey: 'simple' | 'complex') => {
      onChange(JSON.stringify(SAMPLE_JSON_DATA[sampleKey], null, 2))
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pastedText = e.clipboardData.getData('text')
      
      // If pasted text looks like JSON, try to format it
      if (looksLikeJson(pastedText)) {
        try {
          const parsed = JSON.parse(pastedText)
          const formatted = JSON.stringify(parsed, null, 2)
          
          // Prevent default paste and insert formatted JSON
          e.preventDefault()
          onChange(formatted)
          return
        } catch {
          // If formatting fails, let default paste behavior occur
        }
      }
    }

    return (
      <div className={cn("space-y-3", className)}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!value}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadSample('simple')}
            >
              Simple
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadSample('complex')}
            >
              Complex
            </Button>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <Textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
            placeholder={placeholder}
            className={cn(
              "min-h-[400px] font-mono text-sm resize-none",
              "focus:ring-2 focus:ring-primary focus:border-transparent",
            )}
            spellCheck={false}
          />
        </div>

        {/* Input Stats */}
        {value && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Lines: {value.split('\n').length}</span>
            <span>Characters: {value.length}</span>
            <span>Size: {new Blob([value]).size} bytes</span>
          </div>
        )}
      </div>
    )
  }
)

JsonInput.displayName = 'JsonInput'