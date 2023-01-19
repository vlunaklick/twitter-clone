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
      <div className='grid place-items-center h-screen'>
        <div className="min-[520px]:max-w-[414px] h-screen min-[520px]:h-[90vh] w-full shadow-2xl min-[520px]:rounded-md bg-white mx-auto overflow-auto relative">
          {children}
        </div>
      </div>
    </>
  )
}
