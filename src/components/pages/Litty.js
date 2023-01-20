import Avatar from '../app/Avatar'

export default function Litty ({ name, username, avatar, message }) {
  return (
    <article className='px-3 py-2 flex gap-2 border-b border-slate-200'>
      <Avatar src={avatar} alt={username} />
      <section>
        <header className='flex gap-1 items-center'>
          <strong>{name}</strong>
          <small className='text-slate-600'>@{username}</small>
        </header>
        <p className='leading-snug text-sm'>
          {message}
        </p>
      </section>
    </article>
  )
}