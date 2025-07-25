import { Metadata } from 'next'
import { generateToolMetadata, generateStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

export const metadata: Metadata = generateToolMetadata('json-viewer')

export default function JsonViewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData('json-viewer')
  const breadcrumbData = generateBreadcrumbStructuredData('json-viewer')

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