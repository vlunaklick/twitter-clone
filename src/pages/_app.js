import '@/styles/globals.css'

import { Inter } from '@next/font/google'

import AppLayout from '@/components/app/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export default function App ({ Component, pageProps }) {
  return (
    <>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </>
  )
}
