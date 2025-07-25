import { Metadata } from 'next'
import { generateToolMetadata, generateStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

export const metadata: Metadata = generateToolMetadata('percentage-calculator')

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData('percentage-calculator')
  const breadcrumbData = generateBreadcrumbStructuredData('percentage-calculator')

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
      )}
      {children}
    </>
  )
}