import Head from 'next/head'

import { fetchAllLitts } from '@/firebase'
import { useUser } from '@/context/userContext'

import Header from '@/components/app/Header'
import NavLayout from '@/components/layouts/NavLayout'
import Timeline from '@/components/pages/Timeline'

export default function Home({ timelineInitial }) {
  const { user } = useUser()

  return (
    <>
      <NavLayout>
        <Head>
          <title>Inicio / Littera</title>
        </Head>

        <Header>
          <h2 className="pl-3 font-semibold">Inicio</h2>
        </Header>

        <Timeline litts={timelineInitial} connectedUser={user} />
      </NavLayout>
    </>
  )
}

export async function getServerSideProps() {
  const timelineInitial = await fetchAllLitts()

  return {
    props: {
      timelineInitial,
    },
  }
}
