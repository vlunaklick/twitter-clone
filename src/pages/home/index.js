import Head from 'next/head'
import { useContext } from 'react'

import { fetchAllLitts } from '@/firebase/client'
import { UserContext } from '@/context/userContext'

import Header from '@/components/app/Header'
import NavLayout from '@/components/app/NavLayout'
import Timeline from '@/components/pages/Timeline'
import Dropdown from '@/components/pages/profile/Dropdown'

export default function Home({ timelineInitial }) {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavLayout>
        <Head>
          <title>Inicio / Littera</title>
        </Head>

        <Header>
          <h2 className="pl-3 font-semibold">Inicio</h2>
        </Header>

        <Timeline litts={timelineInitial} mainUser_id={user?.id || ''} />
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
