import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, DM_Sans } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppShell } from '@/components/layout/app-shell'
import { PredictionHistoryProvider } from '@/lib/prediction-history'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ESTIVA — Smart Home Price Estimation',
  description:
    'ESTIVA uses machine learning to estimate residential property values from structural, quality and property-related characteristics.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2a2338',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        <TooltipProvider delay={200}>
          <PredictionHistoryProvider>
            <AppShell>{children}</AppShell>
          </PredictionHistoryProvider>
        </TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
