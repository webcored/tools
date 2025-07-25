export interface JsonValidationResult {
  isValid: boolean
  parsed?: any
  error?: string
  errorLine?: number
  errorColumn?: number
}

export interface JsonFormatOptions {
  indent: number
  sortKeys: boolean
}

// Validate and parse JSON string
export function validateJson(jsonString: string): JsonValidationResult {
  if (!jsonString.trim()) {
    return { isValid: false, error: 'JSON input is empty' }
  }

  try {
    const parsed = JSON.parse(jsonString)
    return { isValid: true, parsed }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown JSON error'
    
    // Try to extract line and column information from error message
    const lineMatch = errorMessage.match(/line (\d+)/i)
    const columnMatch = errorMessage.match(/column (\d+)/i)
    const positionMatch = errorMessage.match(/position (\d+)/i)
    
    let errorLine: number | undefined
    let errorColumn: number | undefined
    
    if (lineMatch) {
      errorLine = parseInt(lineMatch[1], 10)
    }
    
    if (columnMatch) {
      errorColumn = parseInt(columnMatch[1], 10)
    } else if (positionMatch) {
      // Calculate line and column from position
      const position = parseInt(positionMatch[1], 10)
      const lines = jsonString.substring(0, position).split('\n')
      errorLine = lines.length
      errorColumn = lines[lines.length - 1].length + 1
    }
    
    return {
      isValid: false,
      error: getHumanReadableError(errorMessage),
      errorLine,
      errorColumn
    }
  }
}

// Convert JSON parsing errors to human-readable messages
function getHumanReadableError(errorMessage: string): string {
  const lowerError = errorMessage.toLowerCase()
  
  if (lowerError.includes('unexpected token')) {
    if (lowerError.includes("'")) {
      return 'Invalid character found. Make sure to use double quotes (") for strings, not single quotes (\').'
    }
    if (lowerError.includes('undefined')) {
      return 'Unexpected end of JSON input. Check for missing closing brackets or quotes.'
    }
    return 'Unexpected character found. Check for missing commas, quotes, or brackets.'
  }
  
  if (lowerError.includes('unexpected end')) {
    return 'JSON is incomplete. Check for missing closing brackets, braces, or quotes.'
  }
  
  if (lowerError.includes('trailing comma')) {
    return 'Remove the trailing comma before closing brackets or braces.'
  }
  
  if (lowerError.includes('duplicate key')) {
    return 'Duplicate property names are not allowed in JSON objects.'
  }
  
  return errorMessage
}

// Format JSON with specified options
export function formatJson(jsonObject: any, options: JsonFormatOptions = { indent: 2, sortKeys: false }): string {
  try {
    if (options.sortKeys) {
      return JSON.stringify(sortObjectKeys(jsonObject), null, options.indent)
    }
    return JSON.stringify(jsonObject, null, options.indent)
  } catch (error) {
    throw new Error('Failed to format JSON: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

// Recursively sort object keys
function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((sorted: any, key) => {
        sorted[key] = sortObjectKeys(obj[key])
        return sorted
      }, {})
  }
  
  return obj
}

// Minify JSON
export function minifyJson(jsonObject: any): string {
  try {
    return JSON.stringify(jsonObject)
  } catch (error) {
    throw new Error('Failed to minify JSON: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}

// Get JSON statistics
export interface JsonStats {
  size: number
  lines: number
  keys: number
  arrays: number
  objects: number
  nulls: number
  booleans: number
  numbers: number
  strings: number
}

export function getJsonStats(jsonObject: any): JsonStats {
  const stats: JsonStats = {
    size: JSON.stringify(jsonObject).length,
    lines: JSON.stringify(jsonObject, null, 2).split('\n').length,
    keys: 0,
    arrays: 0,
    objects: 0,
    nulls: 0,
    booleans: 0,
    numbers: 0,
    strings: 0
  }
  
  function traverse(obj: any): void {
    if (obj === null) {
      stats.nulls++
    } else if (typeof obj === 'boolean') {
      stats.booleans++
    } else if (typeof obj === 'number') {
      stats.numbers++
    } else if (typeof obj === 'string') {
      stats.strings++
    } else if (Array.isArray(obj)) {
      stats.arrays++
      obj.forEach(traverse)
    } else if (typeof obj === 'object') {
      stats.objects++
      Object.keys(obj).forEach(key => {
        stats.keys++
        traverse(obj[key])
      })
    }
  }
  
  traverse(jsonObject)
  return stats
}

// Sample JSON data for testing
export const SAMPLE_JSON_DATA = {
  simple: {
    name: "John Doe",
    age: 30,
    isActive: true,
    email: "john@example.com"
  },
  complex: {
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001",
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      },
      hobbies: ["reading", "swimming", "coding"],
      preferences: {
        theme: "dark",
        notifications: true,
        language: "en"
      }
    },
    posts: [
      {
        id: 1,
        title: "First Post",
        content: "This is my first post!",
        tags: ["intro", "hello"],
        publishedAt: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        title: "JSON Tutorial",
        content: "Learn JSON basics...",
        tags: ["tutorial", "json", "programming"],
        publishedAt: "2024-01-20T14:15:00Z"
      }
    ],
    metadata: {
      version: "1.0.0",
      lastUpdated: "2024-01-25T09:00:00Z",
      features: {
        darkMode: true,
        notifications: true,
        analytics: false
      }
    }
  }
}

// Escape JSON for safe display
export function escapeJsonString(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

// Check if string is likely JSON (heuristic)
export function looksLikeJson(str: string): boolean {
  const trimmed = str.trim()
  return (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  )
}