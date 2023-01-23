import { useTimeline } from '@/hooks/useTimeline'

import LittTimeline from './LittTimeline'

export default function Timeline({ litts, mainUser_id }) {
  const { timeline, handleShared, handleLiked } = useTimeline(litts)

  return (
    <section>
      {timeline?.map(
        ({
          id,
          userName,
          name,
          avatar,
          content,
          createdAt,
          likes,
          likesCount,
          shares,
          sharesCount,
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
            shares={shares}
            sharesCount={sharesCount}
            img={img}
            handleShared={handleShared}
            handleLiked={handleLiked}
            mainUser_id={mainUser_id}
          />
        )
      )}
    </section>
  )
}
