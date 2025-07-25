export interface UrlProcessResult {
  result: string
  error?: string
}

export function encodeUrl(input: string): UrlProcessResult {
  if (!input.trim()) {
    return { result: '', error: 'Input cannot be empty' }
  }

  try {
    const encoded = encodeURIComponent(input)
    return { result: encoded }
  } catch (error) {
    return { 
      result: '', 
      error: 'Failed to encode URL. Please check your input.' 
    }
  }
}

export function decodeUrl(input: string): UrlProcessResult {
  if (!input.trim()) {
    return { result: '', error: 'Input cannot be empty' }
  }

  try {
    const decoded = decodeURIComponent(input)
    return { result: decoded }
  } catch (error) {
    return { 
      result: '', 
      error: 'Failed to decode URL. Input may be malformed or contain invalid characters.' 
    }
  }
}

export function processUrl(input: string, mode: 'encode' | 'decode'): UrlProcessResult {
  return mode === 'encode' ? encodeUrl(input) : decodeUrl(input)
}