import LittTimeline from './LittTimeline'

export default function Timeline({ litts, connectedUser }) {
  return (
    <section>
      {litts?.map(
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
          user_id,
        }) => (
          <LittTimeline
            key={id}
            id={id}
            user_id={user_id}
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
            connectedUser={connectedUser}
          />
        )
      )}
    </section>
  )
}
