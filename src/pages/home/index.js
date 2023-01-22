import Head from 'next/head'
import { useState, useEffect } from 'react'

import { fetchAllLitts, listenLitts } from '@/firebase/client'

import Header from '@/components/app/Header'
import LittTimeline from '@/components/pages/LittTimeline'
import NavLayout from '@/components/app/NavLayout'

export default function Home() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetchAllLitts()
      .then(setTimeline)
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const unsubscribe = listenLitts(setTimeline)
    return unsubscribe
  }, [])

  return (
    <>
      <NavLayout>
        <Head>
          <title>Inicio / Littera</title>
        </Head>
        <Header>
          <h2 className="pl-3 font-semibold">Inicio</h2>
        </Header>
        <section className="min-h-[calc(100vh-100px)] min-[520px]:min-h-[calc(90vh-100px)]">
          {timeline.map(
            ({
              id,
              userName,
              name,
              avatar,
              content,
              createdAt,
              likesCount,
              sharedCount,
              img,
            }) => (
              <LittTimeline
                key={id}
                id={id}
                userName={userName}
                name={name}
                avatar={avatar}
                content={content}
                createdAt={createdAt}
                likesCount={likesCount}
                sharedCount={sharedCount}
                img={img}
              />
            )
          )}
        </section>
      </NavLayout>
    </>
  )
}
