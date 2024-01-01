import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'SwiftMart',
  description: 'SwiftMart: Your seamless destination for diverse shopping needs. Enjoy secure transactions and exceptional service across electronics, fashion, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
