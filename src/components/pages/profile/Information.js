import Link from 'next/link'

export default function Information({
  name,
  userName,
  biography,
  following,
  followers,
}) {
  return (
    <div className="mt-6 flex w-full flex-col gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {name}
        </h1>
        <h2 className="text-xs text-slate-600 dark:text-slate-400">
          @{userName}
        </h2>
      </div>
      <p className="text-xs text-slate-900 dark:text-white">{biography}</p>
      <div className="flex gap-2 text-xs">
        <Link
          href={`/profile/${userName}/following`}
          className="text-slate-600 hover:underline dark:text-slate-400"
        >
          <span className="font-semibold text-black dark:text-white">
            {following ? following.length : 0}
          </span>{' '}
          siguiendo
        </Link>
        <Link
          href={`/profile/${userName}/followers`}
          className="text-slate-600 hover:underline dark:text-slate-400"
        >
          <span className="font-semibold text-black dark:text-white">
            {followers ? followers.length : 0}
          </span>{' '}
          seguidores
        </Link>
      </div>
    </div>
  )
}
