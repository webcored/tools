export interface CalculationResult {
  value: number
  formatted: string
  isValid: boolean
  error?: string
}

export interface PercentageInputs {
  percentage?: number
  baseValue?: number
  value?: number
}

// Validate numeric input
export function validateNumber(input: string | number): { isValid: boolean; value: number; error?: string } {
  const num = typeof input === 'string' ? parseFloat(input) : input
  
  if (isNaN(num)) {
    return { isValid: false, value: 0, error: 'Please enter a valid number' }
  }
  
  if (!isFinite(num)) {
    return { isValid: false, value: 0, error: 'Number is too large' }
  }
  
  return { isValid: true, value: num }
}

// Calculate: What is X% of Y?
export function calculatePercentageOf(percentage: number, baseValue: number): CalculationResult {
  const percentageValidation = validateNumber(percentage)
  const baseValidation = validateNumber(baseValue)
  
  if (!percentageValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Percentage: ${percentageValidation.error}` }
  }
  
  if (!baseValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Base value: ${baseValidation.error}` }
  }
  
  const result = (percentageValidation.value / 100) * baseValidation.value
  
  return {
    value: result,
    formatted: formatResult(result),
    isValid: true
  }
}

// Calculate: What percentage is X of Y?
export function calculateWhatPercentage(value: number, baseValue: number): CalculationResult {
  const valueValidation = validateNumber(value)
  const baseValidation = validateNumber(baseValue)
  
  if (!valueValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Value: ${valueValidation.error}` }
  }
  
  if (!baseValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Base value: ${baseValidation.error}` }
  }
  
  if (baseValidation.value === 0) {
    return { value: 0, formatted: '', isValid: false, error: 'Cannot divide by zero' }
  }
  
  const result = (valueValidation.value / baseValidation.value) * 100
  
  return {
    value: result,
    formatted: `${formatResult(result)}%`,
    isValid: true
  }
}

// Calculate: X increased/decreased by Y%
export function calculatePercentageChange(baseValue: number, percentage: number, isIncrease: boolean = true): CalculationResult {
  const baseValidation = validateNumber(baseValue)
  const percentageValidation = validateNumber(percentage)
  
  if (!baseValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Base value: ${baseValidation.error}` }
  }
  
  if (!percentageValidation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Percentage: ${percentageValidation.error}` }
  }
  
  const change = (percentageValidation.value / 100) * baseValidation.value
  const result = isIncrease ? baseValidation.value + change : baseValidation.value - change
  
  return {
    value: result,
    formatted: formatResult(result),
    isValid: true
  }
}

// Format result for display
export function formatResult(value: number): string {
  if (!isFinite(value)) return '∞'
  
  // For very small numbers, use scientific notation
  if (Math.abs(value) < 0.0001 && value !== 0) {
    return value.toExponential(2)
  }
  
  // For very large numbers, use scientific notation
  if (Math.abs(value) >= 1e12) {
    return value.toExponential(2)
  }
  
  // Round to at most 6 decimal places and remove trailing zeros
  const rounded = Math.round(value * 1e6) / 1e6
  return rounded.toString()
}

// Calculate percentage difference between two values
export function calculatePercentageDifference(value1: number, value2: number): CalculationResult {
  const val1Validation = validateNumber(value1)
  const val2Validation = validateNumber(value2)
  
  if (!val1Validation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `First value: ${val1Validation.error}` }
  }
  
  if (!val2Validation.isValid) {
    return { value: 0, formatted: '', isValid: false, error: `Second value: ${val2Validation.error}` }
  }
  
  if (val1Validation.value === 0) {
    return { value: 0, formatted: '', isValid: false, error: 'Cannot calculate percentage difference when first value is zero' }
  }
  
  const difference = val2Validation.value - val1Validation.value
  const percentageDiff = (difference / val1Validation.value) * 100
  
  return {
    value: percentageDiff,
    formatted: `${formatResult(Math.abs(percentageDiff))}%`,
    isValid: true
  }
}

export type CalculationMode = 'percentage-of' | 'what-percentage' | 'percentage-change' | 'percentage-difference'

export const CALCULATION_MODES = {
  'percentage-of': {
    label: 'What is X% of Y?',
    description: 'Calculate a percentage of a number',
    example: 'What is 25% of 200? = 50'
  },
  'what-percentage': {
    label: 'What percentage is X of Y?',
    description: 'Find what percentage one number is of another',
    example: 'What percentage is 50 of 200? = 25%'
  },
  'percentage-change': {
    label: 'Percentage increase/decrease',
    description: 'Calculate the result after a percentage change',
    example: '200 increased by 25% = 250'
  },
  'percentage-difference': {
    label: 'Percentage difference',
    description: 'Calculate the percentage difference between two numbers',
    example: 'Difference from 200 to 250 = 25%'
  }
} as const