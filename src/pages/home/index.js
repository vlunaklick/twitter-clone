import { useState, useEffect } from 'react'

import Header from '@/components/app/Header'
import Navbar from '@/components/app/Navbar'
import Litty from '@/components/pages/Litty'

export default function Home () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('/api/statuses/home_timeline')
      .then(data => data.json())
      .then(res => setTimeline(res))
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
            username={litty.username}
            name={litty.name}
            avatar={litty.avatar}
            message={litty.message}
          />
        ))
      }
      </section>
      <Navbar />
    </>
  )
}
