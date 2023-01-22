import Head from 'next/head'

export default function AppLayout({ children }) {
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
      <div className="grid h-screen place-items-center">
        <div className="relative mx-auto h-screen w-full overflow-auto bg-white shadow-2xl dark:bg-slate-900 min-[520px]:h-[90vh] min-[520px]:max-w-[414px] min-[520px]:rounded-md">
          {children}
        </div>
      </div>
    </>
  )
}
