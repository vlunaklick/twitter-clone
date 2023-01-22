import Head from 'next/head'
import { useEffect, useContext } from 'react'

import { fetchAllLitts } from '@/firebase/client'

import Header from '@/components/app/Header'
import LittTimeline from '@/components/pages/LittTimeline'
import NavLayout from '@/components/app/NavLayout'
import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { useTimeline } from '@/hooks/useTimeline'

export default function Home({ timelineInitial }) {
  const { user } = useContext(UserContext)
  const { timeline, setTimeline, handleShared, handleLiked } =
    useTimeline(timelineInitial)

  const { router } = useNavigateLink()

  useEffect(() => {
    fetchAllLitts()
      .then(setTimeline)
      .catch(err => console.log(err))
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
        <section>
          {timeline.map(
            ({
              id,
              userName,
              name,
              avatar,
              content,
              createdAt,
              likes,
              likesCount,
              shared,
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
                likes={likes}
                likesCount={likesCount}
                shared={shared}
                sharedCount={sharedCount}
                img={img}
                handleShared={handleShared}
                handleLiked={handleLiked}
                mainUser_id={user?.id || ''}
              />
            )
          )}
        </section>
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
