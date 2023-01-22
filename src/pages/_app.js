import '@/styles/globals.css'

import { ThemeProvider } from 'next-themes'
import { Inter } from '@next/font/google'

import { UserProvider } from '@/context/userContext'
import AppLayout from '@/components/app/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider attribute="class">
        <UserProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </UserProvider>
      </ThemeProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </>
  )
}
