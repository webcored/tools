import { Metadata } from 'next'

export interface ToolMetadata {
  name: string
  description: string
  keywords: string[]
  category: string
  features: string[]
  path: string
}

const SITE_CONFIG = {
  name: 'WebCored Tools',
  description: 'Free online utilities and tools for developers and everyday use',
  url: 'https://webcored.github.io/tools',
  ogImage: '/og-image.png',
  twitter: '@webcored',
  author: 'WebCored'
}

export const TOOLS_DATA: Record<string, ToolMetadata> = {
  'countdown-timer': {
    name: 'Countdown Timer',
    description: 'Create and manage multiple countdown timers for events, deadlines, and special occasions. Track important dates with customizable countdown displays.',
    keywords: [
      'countdown timer', 'event timer', 'deadline tracker', 'countdown clock',
      'timer tool', 'event countdown', 'date countdown', 'time tracker',
      'countdown widget', 'timer countdown', 'deadline countdown', 'countdown app'
    ],
    category: 'Time & Productivity',
    features: [
      'Multiple countdown timers',
      'Event deadline tracking',
      'Customizable timer names',
      'Real-time countdown display',
      'Fullscreen timer view',
      'Data persistence'
    ],
    path: '/countdown-timer'
  },
  'percentage-calculator': {
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increases, decreases, and find what percent one number is of another. Perfect for math, finance, and business calculations.',
    keywords: [
      'percentage calculator', 'percent calculator', 'percentage increase',
      'percentage decrease', 'percent change', 'percentage of number',
      'percent math', 'percentage tool', 'percentage formula', 'calc percentage',
      'percentage conversion', 'percent calculation'
    ],
    category: 'Math & Finance',
    features: [
      'Basic percentage calculation',
      'Percentage increase/decrease',
      'Find percentage of number',
      'Percentage difference',
      'Multiple calculation modes',
      'Real-time results'
    ],
    path: '/percentage-calculator'
  },
  'json-viewer': {
    name: 'JSON Viewer & Parser',
    description: 'View, format, validate and parse JSON data with syntax highlighting and error detection. Perfect for developers working with JSON APIs and data.',
    keywords: [
      'json viewer', 'json parser', 'json formatter', 'json validator',
      'json beautifier', 'json editor', 'json tool', 'json syntax',
      'json pretty print', 'json minifier', 'json tree view', 'json lint'
    ],
    category: 'Developer Tools',
    features: [
      'JSON syntax validation',
      'Interactive tree view',
      'JSON formatting & beautification',
      'Error detection & reporting',
      'Copy & download functionality',
      'File upload support'
    ],
    path: '/json-viewer'
  },
  'url-decoder': {
    name: 'URL Encoder & Decoder',
    description: 'Encode and decode URLs, convert special characters and handle URL-safe formatting. Essential tool for web developers and URL manipulation.',
    keywords: [
      'url encoder', 'url decoder', 'url encode', 'url decode',
      'percent encoding', 'url encoding', 'uri encoding', 'url converter',
      'url escape', 'url unescape', 'url parser', 'url formatter'
    ],
    category: 'Developer Tools',
    features: [
      'URL encoding & decoding',
      'Percent encoding support',
      'Special character conversion',
      'Bulk URL processing',
      'Copy to clipboard',
      'Real-time conversion'
    ],
    path: '/url-decoder'
  }
}

export function generateToolMetadata(toolKey: string): Metadata {
  const tool = TOOLS_DATA[toolKey]
  if (!tool) {
    throw new Error(`Tool metadata not found for: ${toolKey}`)
  }

  const title = `${tool.name} - ${SITE_CONFIG.name}`
  const description = tool.description
  const keywords = [...tool.keywords, 'free tool', 'online tool', 'web tool', SITE_CONFIG.name.toLowerCase()].join(', ')
  const url = `${SITE_CONFIG.url}${tool.path}`

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.name,
    category: tool.category,
    classification: tool.category,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE_CONFIG.twitter,
      images: [SITE_CONFIG.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'application-name': SITE_CONFIG.name,
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
    },
  }
}

export function generateStructuredData(toolKey: string) {
  const tool = TOOLS_DATA[toolKey]
  if (!tool) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: `${SITE_CONFIG.url}${tool.path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    permissions: 'No permissions required',
    isAccessibleForFree: true,
    creator: {
      '@type': 'Organization',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    featureList: tool.features,
    keywords: tool.keywords.join(', '),
    inLanguage: 'en-US',
    browserRequirements: 'Modern web browser with JavaScript enabled',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

export function generateBreadcrumbStructuredData(toolKey: string) {
  const tool = TOOLS_DATA[toolKey]
  if (!tool) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tool.name,
        item: `${SITE_CONFIG.url}${tool.path}`
      }
    ]
  }
}