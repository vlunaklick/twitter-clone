import '@/styles/globals.css'

import { Inter } from '@next/font/google'
import { ThemeProvider } from 'next-themes'

import AppLayout from '@/components/app/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ThemeProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </>
  )
}
