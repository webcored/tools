'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'
import { JsonInput } from '@/components/json/json-input'
import { JsonOutput } from '@/components/json/json-output'
import { validateJson } from '@/lib/json-utils'

export default function JsonViewerPage() {
  const [jsonInput, setJsonInput] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [validationError, setValidationError] = useState<string | undefined>()
  const [parsedJson, setParsedJson] = useState<any>(null)

  const handleInputChange = useCallback((value: string) => {
    setJsonInput(value)
  }, [])

  const handleValidationChange = useCallback((valid: boolean, error?: string) => {
    setIsValid(valid)
    setValidationError(error)
    
    if (valid && jsonInput.trim()) {
      const result = validateJson(jsonInput)
      if (result.isValid && result.parsed !== undefined) {
        setParsedJson(result.parsed)
      } else {
        setParsedJson(null)
      }
    } else {
      setParsedJson(null)
    }
  }, [jsonInput])

  return (
    <ToolLayout>
      <ToolHeader
        title="JSON Viewer / Parser"
        description="View, format, validate and parse JSON data with syntax highlighting and error detection."
        action={
          <div className="flex items-center gap-2">
            {jsonInput && (
              <Badge 
                variant={isValid ? "default" : "destructive"}
                className="flex items-center gap-1"
              >
                {isValid ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    Valid JSON
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    Invalid JSON
                  </>
                )}
              </Badge>
            )}
          </div>
        }
      />
      
      {/* Validation Error Alert */}
      {!isValid && validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>JSON Error:</strong> {validationError}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Main Content - Dual Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              JSON Input
              <Badge variant="outline" className="text-xs font-normal">
                Paste your JSON here
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JsonInput
              value={jsonInput}
              onChange={handleInputChange}
              onValidationChange={handleValidationChange}
            />
          </CardContent>
        </Card>
        
        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              JSON Output
              <Badge variant="outline" className="text-xs font-normal">
                Formatted & Interactive
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <JsonOutput
              jsonData={parsedJson}
              error={!isValid ? validationError : undefined}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Usage Instructions */}
      <Card className="bg-muted/20">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium text-foreground mb-3">How to use:</h3>
            <ul className="space-y-1 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Paste your JSON data in the input panel on the left
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                View the formatted, interactive tree view on the right
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Upload JSON files using the &quot;Upload File&quot; button
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Try the example JSON data with &quot;Simple&quot; or &quot;Complex&quot; buttons
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Switch between Tree, Formatted, and Minified views
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Copy or download the processed JSON data
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  )
}