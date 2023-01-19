import Head from 'next/head'

export default function AppLayout ({ children }) {
  return (
    <>
      <Head>
        <title>Littera</title>
        <meta
          name="description"
          content="Start meeting people, start your community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="min-h-screen min-[520px]:max-w-[414px] w-full shadow-lg bg-slate-50 mx-auto">
          {children}
        </div>
    </>
  )
}
