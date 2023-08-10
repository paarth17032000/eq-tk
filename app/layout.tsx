import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import favIcon from '@/public/assets/favicon-32x32.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eqaim',
  description: 'Feedback controller web application',
  icons: '/assets/favicon-32x32.png'
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
