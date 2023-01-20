import Avatar from '../app/Avatar'

export default function Litty ({ name, userName, avatar, content, createdAt }) {
  return (
    <article className='px-3 py-2 flex gap-2 border-b border-slate-200'>
      <Avatar src={avatar} alt={userName} />
      <section>
        <header className='flex gap-1 items-center'>
          <strong>{name}</strong>
          <small className='text-slate-600'>@{userName}</small>
          <small className='text-slate-600'>·</small>
          <small className='text-slate-600'>{createdAt}</small>
        </header>
        <p className='leading-snug text-sm'>
          {content}
        </p>
      </section>
    </article>
  )
}
