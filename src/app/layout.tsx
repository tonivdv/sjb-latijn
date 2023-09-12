import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Latijnse Woorden Oefenen',
  description: 'Oefen je Latijnse woorden van SJB 1',
  viewport: {
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
    width: 'device-width'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
