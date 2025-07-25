'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RotateCcw } from 'lucide-react'
import { ToolLayout } from '@/components/layout/tool-layout'
import { ToolHeader } from '@/components/layout/tool-header'
import { PercentageInput } from '@/components/calculator/percentage-input'
import { CalculationResultDisplay } from '@/components/calculator/calculation-result'
import { 
  calculatePercentageOf, 
  calculateWhatPercentage, 
  calculatePercentageChange,
  calculatePercentageDifference,
  CalculationResult,
  CalculationMode,
  CALCULATION_MODES
} from '@/lib/percentage'

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<CalculationMode>('percentage-of')
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isIncrease, setIsIncrease] = useState(true)

  // Calculate result whenever inputs change
  useEffect(() => {
    if (!input1.trim() || !input2.trim()) {
      setResult(null)
      return
    }

    const val1 = parseFloat(input1)
    const val2 = parseFloat(input2)

    if (isNaN(val1) || isNaN(val2)) {
      setResult({ value: 0, formatted: '', isValid: false, error: 'Please enter valid numbers' })
      return
    }

    let calculationResult: CalculationResult

    switch (mode) {
      case 'percentage-of':
        calculationResult = calculatePercentageOf(val1, val2)
        break
      case 'what-percentage':
        calculationResult = calculateWhatPercentage(val1, val2)
        break
      case 'percentage-change':
        calculationResult = calculatePercentageChange(val1, val2, isIncrease)
        break
      case 'percentage-difference':
        calculationResult = calculatePercentageDifference(val1, val2)
        break
      default:
        calculationResult = { value: 0, formatted: '', isValid: false, error: 'Unknown calculation mode' }
    }

    setResult(calculationResult)
  }, [input1, input2, mode, isIncrease])

  const handleClear = () => {
    setInput1('')
    setInput2('')
    setResult(null)
  }

  const renderCalculationInterface = () => {
    switch (mode) {
      case 'percentage-of':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
            <span>What is</span>
            <PercentageInput
              value={input1}
              onChange={setInput1}
              placeholder="25"
              error={result?.error?.includes('Percentage')}
            />
            <span>% of</span>
            <PercentageInput
              value={input2}
              onChange={setInput2}
              placeholder="200"
              error={result?.error?.includes('Base value')}
            />
            <span>?</span>
          </div>
        )
      
      case 'what-percentage':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
            <span>What percentage is</span>
            <PercentageInput
              value={input1}
              onChange={setInput1}
              placeholder="50"
              error={result?.error?.includes('Value')}
            />
            <span>of</span>
            <PercentageInput
              value={input2}
              onChange={setInput2}
              placeholder="200"
              error={result?.error?.includes('Base value')}
            />
            <span>?</span>
          </div>
        )
      
      case 'percentage-change':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant={isIncrease ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsIncrease(true)}
              >
                Increase
              </Button>
              <Button
                variant={!isIncrease ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsIncrease(false)}
              >
                Decrease
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
              <PercentageInput
                value={input1}
                onChange={setInput1}
                placeholder="200"
                error={result?.error?.includes('Base value')}
              />
              <span>{isIncrease ? 'increased' : 'decreased'} by</span>
              <PercentageInput
                value={input2}
                onChange={setInput2}
                placeholder="25"
                error={result?.error?.includes('Percentage')}
              />
              <span>% is?</span>
            </div>
          </div>
        )
      
      case 'percentage-difference':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2 text-lg">
            <span>Percentage difference from</span>
            <PercentageInput
              value={input1}
              onChange={setInput1}
              placeholder="200"
              error={result?.error?.includes('First value')}
            />
            <span>to</span>
            <PercentageInput
              value={input2}
              onChange={setInput2}
              placeholder="250"
              error={result?.error?.includes('Second value')}
            />
            <span>?</span>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <ToolLayout>
      <ToolHeader
        title="Percentage Calculator"
        description="Calculate percentages, percentage increases, decreases, and find what percent one number is of another."
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={!input1 && !input2}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        }
      />
      
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Mode Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calculation Type</label>
              <Select value={mode} onValueChange={(value: CalculationMode) => setMode(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CALCULATION_MODES).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      <div>
                        <div className="font-medium">{config.label}</div>
                        <div className="text-xs text-muted-foreground">{config.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Interface */}
        <Card>
          <CardContent className="p-8">
            <div className="space-y-8">
              {renderCalculationInterface()}
              
              <CalculationResultDisplay 
                result={result} 
                className="max-w-md mx-auto"
              />
            </div>
          </CardContent>
        </Card>

        {/* Example */}
        <div className="text-center text-sm text-muted-foreground">
          <div className="font-medium mb-1">Example:</div>
          <div>{CALCULATION_MODES[mode].example}</div>
        </div>
      </div>
    </ToolLayout>
  )
}