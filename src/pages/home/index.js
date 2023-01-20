import { useState, useEffect } from 'react'

import { getLittys } from '@/firebase/client'

import Header from '@/components/app/Header'
import Navbar from '@/components/app/Navbar'
import Litty from '@/components/pages/Litty'

export default function Home () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    getLittys()
      .then(setTimeline)
      .catch(err => console.log(err))
  }, [])

  console.log(timeline)

  return (
    <>
      <Header />
      <section className='min-[520px]:min-h-[calc(90vh-100px)] min-h-[calc(100vh-100px)]'>
      {
        timeline.map(litty => (
          <Litty
            key={litty.id}
            userName={litty.userName}
            name={litty.name}
            avatar={litty.avatar}
            content={litty.content}
            createdAt={litty.createdAt}
          />
        ))
      }
      </section>
      <Navbar />
    </>
  )
}
