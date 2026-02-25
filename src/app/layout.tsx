import type { Metadata } from 'next'
import { Cormorant_Garamond, Geist } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Oscar Guess 2026',
  description: 'Adivinhe os vencedores do Oscar 2026',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${cormorant.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
