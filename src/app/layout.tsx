import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebCored Tools - Free Online Utilities',
  description: 'Collection of free online tools including countdown timers, calculators, and utilities for developers and everyday use.',
  keywords: 'online tools, countdown timer, utilities, free tools, web tools',
  authors: [{ name: 'WebCored' }],
  creator: 'WebCored',
  publisher: 'WebCored',
  metadataBase: new URL('https://tools.webcored.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'WebCored Tools - Free Online Utilities',
    description: 'Collection of free online tools including countdown timers, calculators, and utilities.',
    url: 'https://tools.webcored.com',
    siteName: 'WebCored Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebCored Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebCored Tools - Free Online Utilities',
    description: 'Collection of free online tools including countdown timers, calculators, and utilities.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>
            <div className="flex flex-1 flex-col">
              <div className="flex-1 p-6 pt-0 ml-4">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}