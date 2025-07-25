import { Metadata } from 'next'
import { generateToolMetadata, generateStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

export const metadata: Metadata = generateToolMetadata('countdown-timer')

export default function CountdownTimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData('countdown-timer')
  const breadcrumbData = generateBreadcrumbStructuredData('countdown-timer')

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