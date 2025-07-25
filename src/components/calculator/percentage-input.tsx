import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PercentageInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: boolean
}

export const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(
  ({ value, onChange, placeholder, className, disabled, error, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Allow empty input, numbers, and decimal points
      if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue)) {
        onChange(inputValue)
      }
    }

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'text-center font-mono text-lg min-w-[120px]',
          error && 'border-destructive focus-visible:ring-destructive',
          className
        )}
        {...props}
      />
    )
  }
)

PercentageInput.displayName = 'PercentageInput'